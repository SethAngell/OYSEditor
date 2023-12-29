<script lang="ts">
	import { setContext, onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import type { Writable } from 'svelte/store';
	import { page } from '$app/stores';

	import Footer from '$lib/brand/Footer.svelte';
	import Header from '$lib/brand/Header.svelte';

	import type { user, userInfo } from '$lib/interface';
	import { getCookie } from 'typescript-cookie';

	import '../app.css';

	export const userInfoStore: Writable<userInfo> = writable();
	export const authTokenStore: Writable<string> = writable();
	const urlContent = $page.url;
	const nonRedirects = ['/', '/authentication/login'];

	setContext('currentUserInfo', userInfoStore);
	setContext('currentAuthToken', authTokenStore);

	userInfoStore.subscribe((val) => console.log(val));

	function displayLogIn() {
		let currentLocation = urlContent.pathname;
		location.href = `/authentication/login?redirect=${currentLocation}`;
	}

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
			: { user: nullUser, token: accessTokenFromCookie, photo: null };
		authTokenStore.set(accessTokenFromCookie);

		userInfoStore.set(userInfoFromCookie);
		if (!nonRedirects.includes(urlContent.pathname) && !accessTokenFromCookie) {
			displayLogIn();
		}
	});

	export const prerender = true;
</script>

<main
	class="w-screen min-h-screen h-full flex flex-col items-center justify-center background py-4">
	<Header />
	<slot class="flex flex-col justify-center items-center h-screen" />
	<Footer />
</main>
