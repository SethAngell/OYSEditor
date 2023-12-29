<script lang="ts">
	import SvgIcon from '$lib/util/SvgIcon.svelte';
	import { onMount } from 'svelte';

	enum sizeMapping {
		xxs = '40',
		xs = '48',
		sm = '56',
		md = '64',
		lg = '72',
		full = 'full',
	}

	/** Represents the size of the generated upload field in percentage widths. sm:1/4, md:1/2, lg:3/4, full:full*/
	export let size: string = 'sm';
	/** Represents what type of file we're uploading. image | document */
	export let type: string = 'document';
	/** Name for this file input */
	export let name: string;
	/** help text to be displayed beneath the upload icon */
	export let helpText: string =
		type == 'document' ? 'Click to upload documents' : 'Click to upload photos';
	/** Determines whether the upload should remain a square or fill the screen */
	export let fullWidth: boolean = false;

	const derivedSize: sizeMapping = (<any>sizeMapping)[size];
	const helpTextSize: string = ['xs', 'xxs'].includes(size) ? 'text-md' : 'text-lg';
	let fileInput: HTMLInputElement;
	let fileUploaded: boolean = false;
	let imagePreviewUrl: string;

	onMount(() => {
		fileInput.onchange = (evt) => {
			const file = fileInput.files?.[0];
			if (file) {
				imagePreviewUrl = URL.createObjectURL(file);
				fileUploaded = true;
			}
		};
	});
</script>

<!--
    @component
    A simple, styled file upload component. Supports image preview.    
-->
<input
	id="file-input-{name}"
	{name}
	style="display: none"
	type="file"
	class="w-full h-full"
	bind:this={fileInput} />
<label for="file-input-{name}" class="contents cursor-pointer">
	<div
		id="avatar-container"
		class="flex flex-col items-center justify-center h-{derivedSize} {fullWidth
			? 'w-full'
			: 'aspect-square'} border-2 border-dashed rounded-md border-slate-800">
		{#if !fileUploaded}
			<SvgIcon icon="cloudUpload" additionalClasses="w-3/5 h-3/5" color="slate" />
			<p class="{helpTextSize} px-1 text-center">{helpText}</p>
		{:else if type == 'document'}
			<SvgIcon icon="document" additionalClasses="w-3/5 h-3/5" color="slate" />
			<p class="px-1 text-center">Document Upload Complete!</p>
		{:else if type == 'image'}
			<img
				src={imagePreviewUrl}
				class="left h-full p-1 rounded-lg"
				alt="A preview of your recently uploaded file" />
		{/if}
	</div>
</label>
<!-- TODO: Add Input Clearing Option -->
