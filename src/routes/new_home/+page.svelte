<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	import Sidebar from '$lib/components/Sidebar.svelte';
	import ProfileForm from '$lib/profile/ProfileForm.svelte';
	import ExperienceList from '$lib/profile/ExperienceList.svelte';
	import { Spinner } from 'flowbite-svelte';
	import { HOMEPAGE_STATES } from '$lib/CONSTANTS';

	let currentProfileElement: string = '';

	function handleNewSidebardSelection(event: CustomEvent) {
		currentProfileElement = event.detail.selection;
		$page.url.searchParams.set('section', currentProfileElement);
		goto(`?${$page.url.searchParams.toString()}`);
	}
</script>

<main
	class="flex flex-row bg-slate-50 border-2 border-slate-800 rounded-lg min-w-[50vw] w-fit max-h-screen">
	<Sidebar on:new-sidebar-selection={handleNewSidebardSelection}></Sidebar>
	<div class="h-5/6 w-full flex flex-col justify-center items-center content-center">
		{#if currentProfileElement == null}
			<Spinner color="purple"></Spinner>
		{:else if currentProfileElement == HOMEPAGE_STATES.PROFILE}
			<div class="max-h-[85vh] overflow-scroll">
				<ProfileForm></ProfileForm>
			</div>
		{:else if currentProfileElement == HOMEPAGE_STATES.EXPERIENCE}
			<div class="max-h-[85vh] overflow-scroll">
				<ExperienceList></ExperienceList>
			</div>
		{:else if currentProfileElement == HOMEPAGE_STATES.BLOG}
			<div class="max-h-[85vh] overflow-scroll"></div>
		{:else if currentProfileElement == HOMEPAGE_STATES.CONTENT}
			<div class="max-h-[85vh] overflow-scroll"></div>
		{/if}
	</div>
</main>
