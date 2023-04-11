<script lang="ts">
	import type { content_image, content_document, user_content } from '$lib/interface';
	import type { Writable } from 'svelte/store';

	import { getContext } from 'svelte';
	import { getAllUserContent } from '$lib/content/ContentHelper';

	// State Management
	let scrollView: boolean = false;
	let gridView: boolean = true;

	const token: Writable<string> = getContext('currentAuthToken');
	let userContent: user_content;
	let currentImage: content_image;
	let currentImageIndex: number = 0;

	token.subscribe((newVal) => {
		if (newVal != undefined) {
			getAllUserContent(newVal)
				.then((result) => {
					userContent = result as user_content;
					currentImage = userContent?.images?.[0];
				})
				.catch((error: Error) => {
					console.log(error);
				});
		}
	});

	function switchImage(next: boolean) {
		if (next) {
			currentImageIndex =
				currentImageIndex === userContent?.images.length - 1 ? 0 : currentImageIndex + 1;
			currentImage = userContent.images[currentImageIndex];
		} else {
			currentImageIndex =
				currentImageIndex === 0 ? userContent?.images.length - 1 : currentImageIndex - 1;
			currentImage = userContent.images[currentImageIndex];
		}
	}
</script>

<div class="flex flex-col place-content-center p-2">
	{#if scrollView}
		{#if currentImage}
			<img src={currentImage.image} alt={currentImage.alt_text} class="w-full aspect-auto" />
			<h1>{currentImage.name}</h1>
			<div class="flex flex-row justify-between w-full">
				<button
					on:click={() => {
						switchImage(false);
					}}>Last</button
				>
				<button
					on:click={() => {
						switchImage(true);
					}}>Next</button
				>
			</div>
		{:else}
			<h1>Loading...</h1>
		{/if}
	{:else if gridView}
		<h1 class="text-center">Your Photos</h1>
		{#if userContent && userContent.images?.length > 0}
			<div class="grid grid-cols-4 gap-4">
				{#each userContent.images as grid_image}
					<img
						src={grid_image.image}
						alt={grid_image.alt_text}
						class="aspect-square border border-slate-800 border-2 rounded-sm"
					/>
				{/each}
			</div>
		{:else}
			<div class="loading-spinner" />
		{/if}
	{/if}
</div>
