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
	import SvgIcon from '$lib/util/SvgIcon.svelte';

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
		location.href = `/profile?edit=true`;
	}
</script>

<div class="flex flex-col lg:flex-row h-5/6 w-5/6 gap-x-2 gap-y-2 my-12 lg:my-unset">
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
								><SvgIcon color="slate" icon="link" additionalClasses="w-4 h-4" />
							</a>
						</div>
						<Hr />
					{/each}
					{#each current.content.documents.slice(0, 2) as doc}
						<div class="flex flex-row gap-x-2 w-full items-center">
							<SvgIcon icon="document" color="slate" additionalClasses="w-12 h-12" />
							<h2 class="text-lg">{doc.name}</h2>
							<a target="_blank" href={doc.file}
								><SvgIcon color="slate" icon="link" additionalClasses="w-4 h-4" hover={true} /></a>
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
