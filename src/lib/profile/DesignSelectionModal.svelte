<script lang="ts">
	import { Avatar, Spinner, Button, Hr, ButtonGroup } from 'flowbite-svelte';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	import type { userInfo, design, option, optionsList } from '$lib/interface';
	import { generateOptionsList } from '$lib/util/linkedListBuilder';
	import { getDesigns } from './profileUtils';
	import { getFormattedURL } from '$lib/util/Requests';
	import { icons } from '$lib/util/icons';
	import { element } from 'svelte/internal';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	const userInfoStore: Writable<userInfo> = getContext('currentUserInfo');
	let current = {
		userInfo: {} as userInfo,
		designs: [] as design[],
		options: {} as optionsList,
		selectedOption: {} as option
	};
	let loading = {
		token: true,
		designs: true
	};
	let showExpandedPreview = false;
	let previewWidth: number;
	let previewHeight: number;

	userInfoStore.subscribe((newVal) => {
		if (newVal?.token != undefined && newVal?.user?.id != 0) {
			current.userInfo = newVal;
			loading.token = false;
			loadPage();
		}
	});

	async function loadPage() {
		await getDesigns(current.userInfo.token).then((retrievedDesigns: design[]) => {
			current.designs = retrievedDesigns;
			if (current.designs.length > 1) {
				current.options = generateOptionsList(current.designs);
			} else if (current.designs.length == 0) {
				console.error('Seth fucked up. Go yell at him');
			} else {
				current.options.options.push({
					head: true,
					tail: true,
					payload: current.designs[0]
				});
			}

			current.selectedOption = current.options.options.find((element) => element.head) as option;
			loading.designs = false;
			console.log(current.designs, current.options, current.selectedOption);
		});
	}

	function nextOption() {
		current.selectedOption = current.selectedOption.next
			? current.selectedOption.next
			: current.selectedOption;
	}
	function previousOption() {
		current.selectedOption = current.selectedOption.previous
			? current.selectedOption.previous
			: current.selectedOption;
	}
	function select() {
		dispatch('designSelected', {
			design: current.selectedOption
		});
	}
	function openExpandedPreview(newEvent: KeyboardEvent | MouseEvent) {
		switch (newEvent instanceof KeyboardEvent) {
			case true:
				if (
					newEvent &&
					['space', 'enter'].includes((newEvent as KeyboardEvent)?.code.toLowerCase())
				) {
					showExpandedPreview = true;
				}
				break;
			case false:
				showExpandedPreview = true;
				break;
			default:
				console.error('What in the world did you use as input');
		}
	}
	function closeExpandedPreview(newEvent: KeyboardEvent | MouseEvent) {
		switch (newEvent instanceof KeyboardEvent) {
			case true:
				if (
					newEvent &&
					['space', 'enter'].includes((newEvent as KeyboardEvent)?.code.toLowerCase())
				) {
					showExpandedPreview = false;
				}
				break;
			case false:
				showExpandedPreview = false;
				break;
			default:
				console.error("This shouldn't happen");
		}
	}
</script>

<div
	id="blog-container"
	class="rounded-md border-slate-800 bg-zinc-50 border-2 pb-6 w-fit h-3/6 flex flex-col content-center items-center">
	{#if loading.token || loading.designs}
		<Spinner color="purple" />
	{:else}
		{#if showExpandedPreview}
			<div id="expanded-preview" class="absolute inset-0 w-full h-full z-20">
				<div
					class="absolute inset-0 w-full h-full pointer-events-none bg-slate-700 opacity-50 mx-auto z-10" />
				<img
					class="absolute inset-0 h-auto w-auto max-w-full max-h-full mx-auto z-30"
					src={getFormattedURL(current.selectedOption.payload.example_url)}
					alt="A screenshot of sethangell.com utilizing the template named {current.selectedOption
						.payload.name}." />
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
					class="absolute fill-purple-700 h-12 top-4 right-4 z-30 hover:fill-purple-900"
					role="button"
					on:click={closeExpandedPreview}
					on:keypress={closeExpandedPreview}>{@html icons.close}</svg>
			</div>
		{/if}
		<div class="p-2">
			<h1 class="text-lg uppercase font-bold">Select A Design For Your Profile</h1>
		</div>
		<div id="design-viewer" class="flex flex-col items-center w-5/6">
			<h1 class="text-md uppercase w-full px-1 flex flex-row">Currently Viewing:</h1>
			<h2 class="text-lg uppercase w-full px-1 font-bold">{current.selectedOption.payload.name}</h2>
			<div id="preview-image" class="relative h-72 w-full" role="button">
				<div
					id="img-container"
					class="inline-block peer hover:opacity-50"
					bind:clientWidth={previewWidth}
					bind:clientHeight={previewHeight}
					tabindex="0"
					on:click={openExpandedPreview}
					on:keydown={openExpandedPreview}
					role="button">
					<img
						class="aspect-[16/10] m-auto h-auto w-auto max-h-full max-w-full z-0"
						src={getFormattedURL(current.selectedOption.payload.example_url)}
						alt="A screenshot of sethangell.com utilizing the template named {current.selectedOption
							.payload.name}." />
				</div>
				<div
					style="height: {previewHeight}px; width: {previewWidth}px"
					class="absolute inset-0 z-10 flex-col items-center justify-center hidden peer-hover:flex peer-focus:flex pointer-events-none">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512"
						class="fill-purple-800 h-4 z-20">{@html icons.expand}</svg>
				</div>
			</div>
		</div>
		<ButtonGroup>
			<Button
				class="gap-x-2"
				outline
				color="dark"
				bind:disabled={current.selectedOption.head}
				on:click={previousOption}
				tabindex="0"
				><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fill-purple-800 h-4"
					>{@html icons.arrowLeft}</svg
				>Previous</Button>
			<Button class="gap-x-2" outline color="dark" on:click={select} tabindex="0"
				><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fill-purple-800 h-4"
					>{@html icons.check}</svg
				>Select</Button>
			<Button
				class="gap-x-2"
				outline
				color="dark"
				bind:disabled={current.selectedOption.tail}
				on:click={nextOption}
				tabindex="0"
				><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fill-purple-800 h-4"
					>{@html icons.arrowRight}</svg
				>Next</Button>
		</ButtonGroup>
	{/if}
</div>
