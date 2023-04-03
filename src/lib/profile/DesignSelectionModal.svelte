<script lang="ts">
	import { getContext } from 'svelte';
	import type { user, authTokens } from '$lib/interface';
	import type { Writable } from 'svelte/store';

	import { getRequest } from '$lib/authentication/Requests';

	let currentUser: user;
	let currentAuthTokens: authTokens = {
		access: '',
		refresh: ''
	};

	const tokens: Writable<authTokens> = getContext('currentAuthTokens');
	const user: Writable<user> = getContext('currentUser');

	tokens.subscribe((newTokenValue) => {
		currentAuthTokens = newTokenValue;
		console.log('currentAuth');
		console.log(currentAuthTokens);
	});

	user.subscribe((newUserValue) => {
		currentUser = newUserValue;
	});

	getRequest('shiet', tokens);

	console.log(`Currently in dev mode: ${import.meta.env.DEV}`);
	console.log();
</script>
