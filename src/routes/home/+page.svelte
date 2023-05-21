<script lang="ts">
	import { Avatar, Spinner, Button, Hr } from 'flowbite-svelte';
	import type { Writable } from 'svelte/store';
	import { getContext } from 'svelte';

	import { getProfile, getExperience } from '$lib/profile/profileUtils';
	import { getBlogPosts } from '$lib/blog/blogUtils';
	import { getUserContent } from '$lib/content/contentUtils';
	import type {
		userInfo,
		profile,
		experience,
		blog_post,
		user_content,
		content_document,
		content_image,
		simplified_content
	} from '$lib/interface';

	// State Management
	let loadingToken = true;
	let loadingProfile = true;
	let loadingExperience = true;
	let loadingBlog = true;
	let loadingContent = true;

	// Current Resources
	let currentProfile: profile;
	let currentExperience: experience[];
	let mostRecentExperience: experience;
	let currentUserInfo: userInfo;
	let currentBlogPosts: blog_post[];
	let currentUserContent: user_content;

	const userInfoStore: Writable<userInfo> = getContext('currentUserInfo');

	userInfoStore.subscribe((newVal) => {
		console.log(newVal);
		if (newVal?.token != undefined && newVal?.user?.id != 0) {
			currentUserInfo = newVal;
			loadingToken = false;
			loadPage();
		}
	});

	async function loadPage() {
		await getProfile(currentUserInfo.token, currentUserInfo.user.id).then((newProfile) => {
			currentProfile = newProfile;
			loadingProfile = false;
		});
		await getExperience(currentUserInfo.token).then((newExperience) => {
			currentExperience = newExperience;
			loadingExperience = false;
			mostRecentExperience = currentExperience.filter((exp: experience) => exp.present)[0];
		});
		await getBlogPosts(currentUserInfo.token).then((newPosts) => {
			currentBlogPosts = newPosts;
			loadingBlog = false;
			console.log(currentBlogPosts);
		});
		await getUserContent(currentUserInfo.token).then((newContent) => {
			currentUserContent = newContent;
			loadingContent = false;
			console.log(currentUserContent);
		});
	}

	function editProfile() {
		alert('Edit That Shit!');
	}
</script>

<div class="flex flex-col lg:flex-row h-5/6 w-5/6 gap-x-2 gap-y-2">
	<div
		id="profile-container"
		class="rounded-md border-slate-800 bg-zinc-50 border-2 px-8 pt-8 pb-6 lg:w-3/6 w-full h-full"
	>
		<div class="flex flex-col gap-y-2 justify-center items-center h-full">
			{#if loadingToken || loadingProfile || loadingExperience}
				<Spinner color="purple" />
			{:else}
				<div class="flex flex-col gap-y-4 h-full items-center">
					<img
						src={currentProfile.avatar}
						alt="User Avatar"
						class="rounded-lg h-36 w-36 aspect-square object-cover border-2 border-slate-800"
					/>
					<h1 class="text-5xl">{currentProfile.name}</h1>
					<div class="flex flex-col gap-y-1 items-start">
						<h2 class="text-sm text-slate-600 uppercase font-bold">Headline:</h2>
						<h3 class="text-lg">{currentProfile.headline}</h3>
					</div>
					<div class="flex flex-col gap-y-1 items-start">
						<h2 class="text-sm text-slate-600 uppercase font-bold">Bio:</h2>
						<p class="text-sm">{currentProfile.bio}</p>
					</div>
					<div class="flex flex-col gap-y-1 items-start">
						<h2 class="text-sm text-slate-600 uppercase font-bold">Current Experience:</h2>
						<p class="text-md">{mostRecentExperience.title}</p>
						<p class="text-sm">
							<span class="uppercase">{mostRecentExperience.company}</span> • {mostRecentExperience.start_year}
							- Present
						</p>
						<p class="text-sm">{mostRecentExperience.description}</p>
					</div>
					<div class="flex flex-row w-full justify-end">
						<Button outline on:click={editProfile} color="purple">Edit Profile</Button>
					</div>
				</div>
			{/if}
		</div>
	</div>
	<div id="user-content-container" class="flex flex-col gap-y-2 justify-between w-full lg:w-3/6">
		<div
			id="blog-container"
			class="rounded-md border-slate-800 bg-zinc-50 border-2 px-8 pt-8 pb-6 w-full h-3/6"
		>
			<div class="flex flex-col gap-y-2 justify-center items-start h-full">
				{#if loadingToken || loadingBlog}
					<Spinner color="purple" />
				{:else}
					<h2 class="uppercase text-lg text-slate-800 pb-4">Recent Blog Posts</h2>
					{#each currentBlogPosts.slice(0, 3) as post}
						<div class="w-full flex flex-col gap-y-0.5">
							<h3 class="text-md">
								{post.title} | <span class="text-sm uppercase font-bold">{post.created_date}</span>
							</h3>
							<p class="text-sm">{post.open_graph_protocol_description}</p>
							<Hr />
						</div>
					{/each}
					<div class="flex flex-row w-full justify-end">
						<Button outline on:click={editProfile} color="purple">Edit Blog</Button>
					</div>
				{/if}
			</div>
		</div>
		<div
			id="content-container"
			class="rounded-md border-slate-800 bg-zinc-50 border-2 px-8 pt-8 pb-6 w-full h-3/6"
		>
			<div class="flex flex-col gap-y-2 justify-center items-start w-full h-full">
				{#if loadingToken || loadingContent}
					<Spinner color="purple" />
				{:else}
					<h2 class="uppercase text-lg text-slate-800 pb-4">Recent User Content</h2>
					{#each currentUserContent.images.slice(0, 2) as image}
						<div class="flex flex-row gap-x-2 w-full items-center">
							<img
								class="w-12 h-12 aspect-square rounded-sm"
								src={image.image}
								alt={image.alt_text}
							/>
							<h2 class="text-lg">{image.name}</h2>
							<a target="_blank" class="text-md flex flex-row gap-x-2" href={image.image}
								><svg
									class="w-4 h-4 fill-slate-800"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 640 512"
									><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
										d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"
									/></svg
								></a
							>
						</div>
						<Hr />
					{/each}
					{#each currentUserContent.documents.slice(0, 2) as doc}
						<div class="flex flex-row gap-x-2 w-full items-center">
							<svg
								class="fill-slate-800 w-12 h-12"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 384 512"
								><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
									d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128z"
								/></svg
							>
							<h2 class="text-lg">{doc.name}</h2>
							<a target="_blank" href={doc.file}
								><svg
									class="w-4 h-4 fill-slate-800"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 640 512"
									><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
										d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"
									/></svg
								></a
							>
						</div>
						<Hr />
					{/each}
					<div class="flex flex-row w-full justify-end">
						<Button outline on:click={editProfile} color="purple">Manage Content</Button>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
