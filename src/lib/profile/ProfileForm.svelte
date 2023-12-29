<script lang="ts">
	import { getProfile } from '$lib/profile/profileUtils';
	import { getContext } from 'svelte';

	import type { Writable } from 'svelte/store';
	import type { userInfo, profile, outboundProfile } from '$lib/interface';
	import {
		Label,
		Button,
		Helper,
		Textarea,
		ButtonGroup,
		InputAddon,
		Input,
		Spinner,
	} from 'flowbite-svelte';

	import SocialLink from '$lib/profile/SocialLink.svelte';
	import SvgIcon from '$lib/util/SvgIcon.svelte';
	import FileUpload from '$lib/util/FileUpload.svelte';
	import ProfileView from '$lib/profile/ProfileView.svelte';
	import { putRequest, postRequest } from '$lib/util/Requests';
	import { page } from '$app/stores';
	import type { NoProfileConfiguredError } from '$lib/errors';

	const userInfoStore: Writable<userInfo> = getContext('currentUserInfo');
	const urlContent = $page.url;

	let editOnLoad = urlContent.searchParams.get('edit')?.toLowerCase() == 'true' ? true : false;

	let current = {
		userInfo: {} as userInfo,
		profile: {} as profile,
	};
	let loading = {
		token: true,
		profile: true,
	};

	let states = {
		noProfile: false,
		editing: editOnLoad,
		viewing: !editOnLoad,
	};

	userInfoStore.subscribe((newVal) => {
		if (newVal?.token != undefined && newVal?.user?.id != 0) {
			current.userInfo = newVal;
			loading.token = false;
			loadPage();
		}
	});

	async function loadPage() {
		getProfile(current.userInfo.token, current.userInfo.user.id)
			.then((retrievedProfile: profile) => {
				current.profile = retrievedProfile;
				loading.profile = false;

				if (!current.profile.name) {
					states.viewing = false;
					states.noProfile = true;
				}
			})
			.catch((_: NoProfileConfiguredError) => {
				states.viewing = false;
				states.noProfile = true;
				loading.profile = false;
			});
	}

	function editProfile() {
		states.editing = true;
		states.noProfile = false;
		states.viewing = false;
	}

	function viewProfile() {
		states.editing = false;
		states.noProfile = current.profile ? false : true;
		states.viewing = true;
	}

	function validateForm(data: outboundProfile) {
		if (!data.user) {
			data.user = current.userInfo.user.id;
		}

		if (data?.avatar?.size == 0) {
			delete data.avatar;
		}

		if (data?.resume?.size == 0) {
			delete data.resume;
		}

		return data;
	}

	function onSubmit(e: any) {
		console.log(e.target);
		const formData = new FormData(e.target as HTMLFormElement);

		const rawData = {};
		for (let field of formData) {
			let [key, value] = field;
			// @ts-ignore
			rawData[key] = value;
		}

		const validatedData: outboundProfile = validateForm(rawData as outboundProfile);

		if (states.noProfile) {
			postRequest(`/api/v1/profiles/landing-page/`, current.userInfo.token, validatedData)
				.then((response) => {
					console.log(response);
				})
				.catch((error) => {
					console.error(error);
				});
		} else {
			putRequest(
				`/api/v1/profiles/landing-page/${current.userInfo.user.id}/`,
				current.userInfo.token,
				validatedData,
			)
				.then((response) => {
					viewProfile();
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}
</script>

<div class="max-h-screen w-full flex flex-col content-center items-center">
	{#if loading.token || loading.profile}
		<Spinner color="purple" class="my-6" />
	{:else if states.viewing}
		<ProfileView {current} newUser={states.noProfile} on:edit={editProfile} />
	{:else if states.editing || states.noProfile}
		<form class="w-full p-6 karla" on:submit|preventDefault={onSubmit}>
			<div class="flex flex-col gap-y-6 w-full mb-4">
				<h2 class="text-lg">Info About You:</h2>
				<h3 class="text-md -mt-4">All of this info is required.</h3>
				<div class="w-full">
					<Label for="name" class="mb-2 text-md uppercase"
						><span class="text-red-600">*</span> Name:</Label>
					<Input
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
					<Input
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
				<div>
					<Label class="pb-2 text-md uppercase"
						><span class="text-red-600">*</span> Profile Picture:</Label>
					<FileUpload
						size="xs"
						type="image"
						name="avatar"
						fullWidth={true}
						helpText="Click here to upload your profile picture" />
				</div>
				<h2 class="text-lg">Where To Find You Online:</h2>
				<h3 class="text-md -mt-4">Only fill out what you'd like to share!</h3>
				<div>
					<Label for="contact_email" class="mb-2">Contact Email</Label>
					<Input
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
							<Input
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
							<Input
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
							<Input
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
							<Input
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
							<Input
								id="github"
								name="github"
								type="text"
								placeholder="WozsSecondAccount"
								bind:value={current.profile.github} />
						</ButtonGroup>
					</div>
				</div>
				<div>
					<Label class="pb-2 text-md uppercase">Resume:</Label>
					<FileUpload
						size="xs"
						type="document"
						name="resume"
						fullWidth={true}
						helpText="Click here to upload your resume" />
				</div>
			</div>
			<div class="flex flex-row gap-x-2">
				<Button outline id="submit-button" color="purple" on:click={onSubmit} type="submit"
					>Submit</Button>
				<Button outline id="cancel-button" color="red" on:click={viewProfile}>Cancel</Button>
			</div>
		</form>
	{/if}
</div>
