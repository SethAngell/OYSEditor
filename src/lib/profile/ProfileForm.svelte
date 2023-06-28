<script lang="ts">
	import { getProfile } from '$lib/profile/profileUtils';
	import { getContext } from 'svelte';

	import type { Writable } from 'svelte/store';
	import type { userInfo, profile } from '$lib/interface';

	import SocialLink from '$lib/profile/SocialLink.svelte';
	import SvgIcon from '$lib/util/SvgIcon.svelte';
	import FileUpload from '$lib/util/FileUpload.svelte';
	import ProfileView from '$lib/profile/ProfileView.svelte';
	import { page } from '$app/stores';

	const userInfoStore: Writable<userInfo> = getContext('currentUserInfo');
	const urlContent = $page.url;

	let editOnLoad = urlContent.searchParams.get('edit') ? true : false;

	let current = {
		userInfo: {} as userInfo,
		profile: {} as profile
	};
	let loading = {
		token: true,
		profile: true
	};

	let states = {
		noProfile: false,
		editing: editOnLoad,
		viewing: !editOnLoad
	};

	userInfoStore.subscribe((newVal) => {
		if (newVal?.token != undefined && newVal?.user?.id != 0) {
			current.userInfo = newVal;
			loading.token = false;
			loadPage();
		}
	});

	async function loadPage() {
		await getProfile(current.userInfo.token, current.userInfo.user.id).then(
			(retrievedProfile: profile) => {
				current.profile = retrievedProfile;
				loading.profile = false;

				if (!current.profile.name) {
					states.viewing = false;
					states.noProfile = true;
				}
			}
		);
	}

	function editProfile() {
		states.editing = true;
		states.noProfile = false;
		states.viewing = false;
	}

	function onSubmit(e) {
		const formData = new FormData(e.target);

		const data = {};
		for (let field of formData) {
			let [key, value] = field;
			data[key] = value;
		}
		console.log(data);
	}
</script>

<div class="w-full flex flex-col content-center items-center">
	{#if loading.token || loading.profile}
		<!-- <Spinner color="purple" /> -->
	{:else if states.viewing}
		<ProfileView {current} on:editProfile={editProfile} />
	{:else if states.editing || states.noProfile}
		<form class="w-full p-6 karla" on:submit|preventDefault={onSubmit}>
			<div class="flex flex-col gap-y-6 w-full mb-4">
				<FileUpload size="xxs" type="image" name="avatar" />
				<!-- <h2 class="text-lg">Info About You:</h2>
				<h3 class="text-md -mt-4">All of this info is required.</h3>
				<div class="w-full">
					<Label for="name" class="mb-2 text-md uppercase"
						><span class="text-red-600">*</span> Name:</Label>
					<input
						type="text"
						id="name"
						name="name"
						placeholder="Steve Jobs"
						class="mb-1 w-full"
						bind:value={current.profile.name}
						autocomplete="name"
						required />
					<Helper class="text-sm"
						>Enter your name as you'd like it to appear across your entire site.</Helper>
				</div>
				<div>
					<Label for="headline" class="mb-2 text-md uppercase"
						><span class="text-red-600">*</span> Headline:</Label>
					<input
						type="text"
						id="headline"
						placeholder="Innovation distinguishes between a leader and a follower."
						class="mb-1"
						maxlength="100"
						name="headline"
						bind:value={current.profile.headline}
						required />
					<Helper class="text-sm">This should be a short elevator pitch.</Helper>
				</div>
				<div>
					<Label class="pb-2 text-md uppercase" for="avater"
						><span class="text-red-600">*</span> Profile Picture:</Label>
					<Fileupload id="avatar" name="avatar" size="sm" class="pl-2" required /> 
				</div>
				<div>
					<Label for="bio" class="mb-2 text-md uppercase"
						><span class="text-red-600">*</span> Bio:</Label>
					<Textarea
						id="bio"
						placeholder="Let's learn more about you..."
						rows="4"
						name="bio"
						bind:value={current.profile.bio}
						required />
				</div>
				<h2 class="text-lg">Where To Find You Online:</h2>
				<h3 class="text-md -mt-4">Only fill out what you'd like to share!</h3>
				<div>
					<Label for="contact_email" class="mb-2">Contact Email</Label>
					<input
						type="email"
						name="contact_email"
						id="contact_email"
						placeholder="steve@jobs.com"
						bind:value={current.profile.contact_email}
						autocomplete="email" />
					<Helper class="text-sm"
						>Do you want people to be able to reach you? Leave an email address here.</Helper>
				</div>
				<div class="grid gap-4 grid-cols-2">
					<div>
						<ButtonGroup class="w-full" size="sm">
							<InputAddon
								><SvgIcon icon="instagram" color="slate" additionalClasses="w-4 h-4" /></InputAddon>
							<InputAddon>https://instagram.com/</InputAddon>
							<input
								id="instagram"
								name="instagram"
								type="text"
								placeholder="SteveJobs"
								bind:value={current.profile.instagram} />
						</ButtonGroup>
					</div>
					<div>
						<ButtonGroup class="w-full" size="sm">
							<InputAddon
								><SvgIcon icon="spotify" color="slate" additionalClasses="w-4 h-4" /></InputAddon>
							<InputAddon>https://spotify.com/user/</InputAddon>
							<input
								id="spotify"
								name="spotify"
								type="text"
								placeholder="StevesClassicJams"
								bind:value={current.profile.spotify} />
						</ButtonGroup>
					</div>
					<div>
						<ButtonGroup class="w-full" size="sm">
							<InputAddon
								><SvgIcon icon="twitter" color="slate" additionalClasses="w-4 h-4" /></InputAddon>
							<InputAddon>https://twitter.com/</InputAddon>
							<input
								id="twitter"
								name="twitter"
								type="text"
								placeholder="AppleFan1452"
								bind:value={current.profile.twitter} />
						</ButtonGroup>
					</div>
					<div>
						<ButtonGroup class="w-full" size="sm">
							<InputAddon
								><SvgIcon icon="linkedin" color="slate" additionalClasses="w-4 h-4" /></InputAddon>
							<InputAddon>https://linkedin.com/</InputAddon>
							<input
								id="linkedin"
								name="linkedin"
								type="text"
								placeholder="StephenJobs"
								bind:value={current.profile.linkedin} />
						</ButtonGroup>
					</div>
					<div>
						<ButtonGroup class="w-full" size="sm">
							<InputAddon
								><SvgIcon icon="github" color="slate" additionalClasses="w-4 h-4" /></InputAddon>
							<InputAddon>https://github.com/</InputAddon>
							<input
								id="github"
								name="github"
								type="text"
								placeholder="WozsSecondAccount"
								bind:value={current.profile.github} />
						</ButtonGroup>
					</div>
					<div>
						<Label class="pb-2 text-md uppercase" for="avater">Resume:</Label>
						<Fileupload id="resume" name="resume" size="sm" class="pl-2" />
					</div>
				</div>
			</div>
			<Button type="submit">Submit</Button> -->
			</div>
		</form>
	{/if}
</div>
