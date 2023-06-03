<script lang="ts">
	import SvgIcon from '$lib/util/SvgIcon.svelte';

	export let url: string;
	export let identifier: string;
	export let service: string;
	export let fillColor: string;
</script>

<div class="flex flex-row gap-x-2 items-center">
	<SvgIcon color={fillColor} icon={service} additionalClasses="w-8 h-8" hover={true} />
	{#if identifier}
		<a href={url} target="_blank" class="underline hover:text-purple-800 focus:text-purple-800"
			>{identifier}</a>
	{:else}
		<p>NOT SET</p>
	{/if}
</div>
