<script lang="ts">
	import { setContext, onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import type { Writable } from 'svelte/store';

	import Footer from '$lib/brand/Footer.svelte';

	import type { user, userInfo } from '$lib/interface';
	import { getCookie } from '$lib/authentication/AuthManager';

	import '../app.css';

	export const userInfoStore: Writable<userInfo> = writable();
	export const authTokenStore: Writable<string> = writable();

	setContext('currentUserInfo', userInfoStore);
	setContext('currentAuthToken', authTokenStore);

	userInfoStore.subscribe((val) => console.log(val));

	onMount(async () => {
		var accessTokenFromCookie = getCookie('AccessToken');
		var rawUserInfoFromCookie = getCookie('UserInfo');
		console.log(`1: ${accessTokenFromCookie}`);

		accessTokenFromCookie = accessTokenFromCookie ? accessTokenFromCookie : '';

		console.log(`2: ${accessTokenFromCookie}`);

		let nullUser: user = {
			name: '',
			id: 0,
			email: ''
		};
		var userInfoFromCookie = rawUserInfoFromCookie
			? JSON.parse(rawUserInfoFromCookie)
			: { user: nullUser, token: accessTokenFromCookie };
		authTokenStore.set(accessTokenFromCookie);

		userInfoStore.set(userInfoFromCookie);
	});

	export const prerender = true;
</script>

<main class="w-screen h-screen flex flex-col items-center justify-center background">
	<slot class="flex flex-col justify-center items-center h-screen" />
	<Footer />
</main>
