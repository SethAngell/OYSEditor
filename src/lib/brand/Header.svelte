<script lang="ts">
	import { getProfilePicture } from '$lib/profile/profileUtils';
	import { onMount } from 'svelte';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { userInfo, profile, profilePicture } from '$lib/interface';
	import { NoProfileConfiguredError } from '$lib/errors';
	import SvgIcon from '$lib/util/SvgIcon.svelte';

	const userInfoStore: Writable<userInfo> = getContext('currentUserInfo');
	let current = {
		userInfo: {} as userInfo,
		profile: {} as profile,
		open: false
	};
	let loadingProfilePic: boolean = true;

	userInfoStore.subscribe((newVal) => {
		if (newVal?.token != undefined && newVal?.user?.id != 0) {
			current.userInfo = newVal;
			loadProfilePicture();
		}
	});

	function loadProfilePicture() {
		getProfilePicture(current.userInfo.token, current.userInfo.user.id)
			.then((photo: profilePicture) => {
				current.userInfo.photo = photo;
				loadingProfilePic = false;
			})
			.catch((error) => {
				if (error.detail.includes('NoLandingPageConfiguredExpection')) {
					throw new NoProfileConfiguredError(error);
				} else {
					throw new Error(error);
				}
			});
	}

	function clickHeader() {
		current.open = !current.open;
	}

	let currentYear = new Date().getFullYear();
</script>

<div
	class="fixed top-0 w-full bg-zinc-50 border-slate-800 border-2 px-2 pt-1 flex flex-row justify-between items-center h-12">
	<a href="/home"><span>The Good Internet</span></a>
	<div class="flex flex-row gap-x-2">
		{#if current?.userInfo && current.userInfo?.photo?.url}
			<div
				on:click={clickHeader}
				on:keydown={clickHeader}
				class="flex flex-row gap-x-2 items-center group">
				{#if current.open}
					<SvgIcon color="slate" icon="chevronUp" additionalClasses="h-3 w-3" hover={true} />
				{:else}
					<SvgIcon color="slate" icon="chevronDown" additionalClasses="h-3 w-3" hover={true} />
				{/if}
				<p class="text-sm text-slate-800 group-hover:text-purple-900">
					Welcome back, {current.userInfo.user.name}
				</p>
				<img
					class="rounded-full h-8 border border-2 border-slate-800 group-hover:border-3 group-focus:border-3 group-hover:border-purple-900 group-focus:border-purple-900"
					src={current.userInfo.photo?.url}
					alt={`A profile picture of ${current.userInfo.user.name}`} />
			</div>
		{/if}
	</div>
</div>
