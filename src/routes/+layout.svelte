<script lang="ts">
	import { setContext, onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import type { Writable } from 'svelte/store';

	import Footer from '$lib/brand/Footer.svelte';

	import type { user, authTokens } from '$lib/interface';
	import { getCookie } from '$lib/authentication/AuthManager';

	import '../app.css';

	const userStore: Writable<user> = writable();
	const authTokenStore: Writable<authTokens> = writable();

	setContext('currentUser', userStore);
	setContext('currentAuthTokens', authTokenStore);

	onMount(async () => {
		var accessFromCookie = getCookie('accessToken');
		var refreshFromCookie = getCookie('refreshToken');

		accessFromCookie = accessFromCookie ? accessFromCookie : '';
		refreshFromCookie = refreshFromCookie ? refreshFromCookie : '';

		let newToken: authTokens = {
			access: accessFromCookie,
			refresh: refreshFromCookie
		};

		let nullUser: user = {
			name: '',
			id: 0,
			email: ''
		};

		authTokenStore.set(newToken);
		userStore.set(nullUser);
	});

	export const prerender = true;
</script>

<main class="w-screen h-screen flex flex-col items-center justify-center background">
	<slot class="flex flex-col justify-center items-center h-screen" />
	<Footer />
</main>
