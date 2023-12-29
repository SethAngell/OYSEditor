<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	import { getCookie } from 'typescript-cookie';
	import { Spinner } from 'flowbite-svelte';

	import { getExperience } from '$lib/profile/profileUtils';
	import type { experience } from '$lib/interface';
	import { ACCESS_TOKEN_COOKIE } from '$lib/CONSTANTS';
	import ExperienceDetail from './ExperienceDetail.svelte';

	const state = {
		loading: true,
		accessToken: getCookie(ACCESS_TOKEN_COOKIE),
	};

	let experienceList: experience[];

	if (state.accessToken == null) {
		goto('/authentication/login?redirect=/new_home?section=experience');
	}

	onMount(async () => {
		experienceList = await getExperience(state.accessToken!);
		experienceList.sort((a, b) => a.start_year - b.start_year).reverse();
	});
</script>

<div class="flex flex-col justify-start items-start gap-y-4 p-4 max-w-[50vw]">
	<h1 class="text-3xl">Your Experience</h1>
	{#if experienceList}
		{#each experienceList as exp}
			<ExperienceDetail Experience={exp}></ExperienceDetail>
		{/each}
	{:else}
		<Spinner color="purple"></Spinner>
	{/if}
</div>
