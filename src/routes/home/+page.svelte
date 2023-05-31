<script lang="ts">
	import { Avatar, Spinner, Button, Hr } from 'flowbite-svelte';
	import type { Writable } from 'svelte/store';
	import { getContext } from 'svelte';

	import { getProfile, getExperience } from '$lib/profile/profileUtils';
	import { getBlogPosts, getBlog } from '$lib/blog/blogUtils';
	import { getUserContent } from '$lib/content/contentUtils';
	import type {
		userInfo,
		profile,
		experience,
		blog_post,
		blog,
		user_content,
		content_document,
		content_image,
		simplified_content
	} from '$lib/interface';

	// State Management
	let loading = {
		token: true,
		profile: true,
		experience: true,
		blog: true,
		posts: true,
		content: true
	};

	// Current Resources
	let current = {
		profile: {} as profile,
		experience: [] as experience[],
		recentExperience: {} as experience,
		userInfo: {} as userInfo,
		blog: {} as blog,
		posts: [] as blog_post[],
		content: {} as user_content
	};

	const userInfoStore: Writable<userInfo> = getContext('currentUserInfo');

	userInfoStore.subscribe((newVal) => {
		console.log(newVal);
		if (newVal?.token != undefined && newVal?.user?.id != 0) {
			current.userInfo = newVal;
			loading.token = false;
			loadPage();
		}
	});

	async function loadPage() {
		await getProfile(current.userInfo.token, current.userInfo.user.id).then((newProfile) => {
			current.profile = newProfile;
			loading.profile = false;
		});
		await getExperience(current.userInfo.token).then((newExperience) => {
			current.experience = newExperience;
			loading.experience = false;
			current.recentExperience = current.experience.filter((exp: experience) => exp.present)[0];
		});
		await getBlogPosts(current.userInfo.token).then((newPosts) => {
			current.posts = newPosts;
			loading.posts = false;
		});
		await getBlog(current.userInfo.token).then((newBlog) => {
			current.blog = newBlog;
			loading.blog = false;
		});
		await getUserContent(current.userInfo.token).then((newContent) => {
			current.content = newContent;
			loading.content = false;
		});
	}

	function editProfile() {
		alert('Edit That Shit!');
	}
</script>

<div class="flex flex-col lg:flex-row h-5/6 w-5/6 gap-x-2 gap-y-2">
	<div
		id="profile-container"
		class="rounded-md border-slate-800 bg-zinc-50 border-2 pb-6 lg:w-3/6 w-full h-full">
		<div
			class="p-1 px-2 mb-8 -mx-0.5 -mt-0.5 flex flex-col justify-start rounded-t-md top-0 left-0 right-0 border-slate-800 border-2">
			<h1 class="text-lg uppercase font-bold">Your Profile</h1>
		</div>
		<div class="flex flex-col gap-y-2 justify-center items-center h-full mx-8">
			{#if loading.token || loading.profile || loading.experience}
				<Spinner color="purple" />
			{:else}
				<div class="flex flex-col gap-y-4 h-full items-center">
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
						<h2 class="text-sm text-slate-600 uppercase font-bold">Current Experience:</h2>
						<p class="text-md">{current.recentExperience.title}</p>
						<div class="flex flex-row justify-between w-full">
							<p class="text-sm">
								<span class="uppercase">{current.recentExperience.company}</span> • {current
									.recentExperience.start_year}
								- Present
							</p>
							<a
								class="underline text-purple-600 hover:text-purple-800 focus:text-purple-800"
								href={current.recentExperience.link}>{current.recentExperience.link_title}</a>
						</div>
						<p class="text-sm">{current.recentExperience.description}</p>
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
			class="rounded-md border-slate-800 bg-zinc-50 border-2 pb-6 w-full h-3/6">
			<div
				class="p-1 px-2 mb-8 -mx-0.5 -mt-0.5 flex flex-col justify-start rounded-t-md top-0 left-0 right-0 border-slate-800 border-2">
				<h1 class="text-lg uppercase font-bold">{current.blog.blog_name}</h1>
			</div>
			<div class="flex flex-col gap-y-2 mx-8 justify-start items-start h-full">
				{#if loading.token || loading.posts || loading.blog}
					<Spinner color="purple" />
				{:else}
					<h2 class="uppercase text-lg text-slate-800 pb-4">Recent Blog Posts</h2>
					{#each current.posts.slice(0, 3) as post}
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
			class="rounded-md border-slate-800 bg-zinc-50 border-2 pb-6 w-full h-3/6">
			<div
				class="p-1 px-2 mb-8 -mx-0.5 -mt-0.5 flex flex-col justify-start rounded-t-md top-0 left-0 right-0 border-slate-800 border-2">
				<h1 class="text-lg uppercase font-bold">Your Content</h1>
			</div>
			<div class="flex flex-col gap-y-2 justify-start items-start h-full mx-8">
				{#if loading.token || loading.content}
					<Spinner color="purple" />
				{:else}
					<h2 class="uppercase text-lg text-slate-800 pb-4">Recent User Content</h2>
					{#each current.content.images.slice(0, 2) as image}
						<div class="flex flex-row gap-x-2 w-full items-center">
							<img
								class="w-12 h-12 aspect-square rounded-sm"
								src={image.image}
								alt={image.alt_text} />
							<h2 class="text-lg">{image.name}</h2>
							<a target="_blank" class="text-md flex flex-row gap-x-2" href={image.image}
								><svg
									class="w-4 h-4 fill-slate-800"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 640 512"
									><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
										d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z" /></svg
								></a>
						</div>
						<Hr />
					{/each}
					{#each current.content.documents.slice(0, 2) as doc}
						<div class="flex flex-row gap-x-2 w-full items-center">
							<svg
								class="fill-slate-800 w-12 h-12"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 384 512"
								><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
									d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128z" /></svg>
							<h2 class="text-lg">{doc.name}</h2>
							<a target="_blank" href={doc.file}
								><svg
									class="w-4 h-4 fill-slate-800"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 640 512"
									><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
										d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z" /></svg
								></a>
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
