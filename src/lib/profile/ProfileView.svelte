<script lang="ts">
	import { Avatar, Spinner, Button } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	import type { userInfo, profile } from '$lib/interface';
	import SocialLink from '$lib/profile/SocialLink.svelte';
	import SvgIcon from '$lib/util/SvgIcon.svelte';

	const dispatch = createEventDispatcher();

	export let current = {
		userInfo: {} as userInfo,
		profile: {} as profile
	};

	function editProfile() {
		dispatch('edit', {
			edit: true
		});
	}
</script>

<div class="flex flex-col gap-y-4 h-full items-center m-6">
	<img
		src={current.profile.avatar}
		alt="User Avatar"
		class="rounded-lg h-36 w-36 aspect-square object-cover border-2 border-slate-800" />
	<h1 class="text-5xl">{current.profile.name}</h1>
	<div class="flex flex-col gap-y-1 items-start w-full">
		<h2 class="text-sm text-slate-600 uppercase font-bold">Headline:</h2>
		<h3 class="text-lg">{current.profile.headline}</h3>
	</div>
	<div class="flex flex-col gap-y-1 items-start w-full">
		<h2 class="text-sm text-slate-600 uppercase font-bold">Bio:</h2>
		<p class="text-sm">{current.profile.bio}</p>
	</div>
	<div class="flex flex-col gap-y-1 items-start w-full">
		<h2 class="text-sm text-slate-600 uppercase font-bold">Email:</h2>
		<p class="text-sm">{current.profile.contact_email}</p>
	</div>
	<div class="flex flex-col gap-y-1 items-start w-full">
		<h2 class="text-sm text-slate-600 uppercase font-bold">Social URLs:</h2>
		<div class="flex flex-row w-full justify-between">
			<SocialLink
				fillColor="purple"
				url="https://spotify.com/user/{current.profile.spotify}"
				identifier={current.profile.spotify ? current.profile.spotify : ''}
				service="spotify" />
			<SocialLink
				fillColor="purple"
				url="https://instagram.com/{current.profile.instagram}"
				identifier={current.profile.instagram ? current.profile.instagram : ''}
				service="instagram" />
			<SocialLink
				fillColor="purple"
				url="https://twitter.com/{current.profile.twitter}"
				identifier={current.profile.twitter ? current.profile.twitter : ''}
				service="twitter" />
			<SocialLink
				fillColor="purple"
				url="https://linkedin.com/in/{current.profile.linkedin}"
				identifier={current.profile.linkedin ? current.profile.linkedin : ''}
				service="linkedin" />
			<SocialLink
				fillColor="purple"
				url="https://github.com/{current.profile.github}"
				identifier={current.profile.github ? current.profile.github : ''}
				service="github" />
		</div>
	</div>
	<div class="flex flex-col gap-y-1 items-start w-full">
		<h2 class="text-sm text-slate-600 uppercase font-bold">Resume:</h2>
		<div class="flex flex-row gap-x-2">
			<SvgIcon icon="document" color="slate" additionalClasses="h-6 w-6" />
			{#if current.profile.resume}
				<a href={current.profile.resume} target="_blank">Currently Uploaded Resume</a>
			{:else}
				<p>No Resume Uploaded</p>
			{/if}
		</div>
	</div>
	<div class="flex flex-row w-full justify-end">
		<Button outline on:click={editProfile} color="purple" tabindex="0">Edit Profile</Button>
	</div>
</div>
