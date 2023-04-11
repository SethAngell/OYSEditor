<script lang="ts">
	import { setContext, onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import type { Writable } from 'svelte/store';

	import Footer from '$lib/brand/Footer.svelte';

	import type { user } from '$lib/interface';
	import { getCookie } from '$lib/authentication/AuthManager';

	import '../app.css';

	export const userStore: Writable<user> = writable();
	export const authTokenStore: Writable<string> = writable();

	setContext('currentUser', userStore);
	setContext('currentAuthToken', authTokenStore);

	onMount(async () => {
		var accessFromCookie = getCookie('AccessToken');
		console.log(`1: ${accessFromCookie}`);

		accessFromCookie = accessFromCookie ? accessFromCookie : '';

		console.log(`2: ${accessFromCookie}`);

		let nullUser: user = {
			name: '',
			id: 0,
			email: ''
		};

		authTokenStore.set(accessFromCookie);
		userStore.set(nullUser);
	});

	export const prerender = true;
</script>

<main class="w-screen h-screen flex flex-col items-center justify-center background">
	<slot class="flex flex-col justify-center items-center h-screen" />
	<Footer />
</main>
