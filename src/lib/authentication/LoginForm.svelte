<script lang="ts">
	import { getContext, setContext } from 'svelte';
	import type { user, authTokens } from '$lib/interface';
	import type { Writable } from 'svelte/store';

	import { setCookie } from '$lib/authentication/AuthManager';

	const currentTokens: Writable<authTokens> = getContext('currentAuthTokens');
	const currentUser: Writable<user> = getContext('currentUser');

	let email = '';
	let password = '';
	let api_base_url = import.meta.env.VITE_API_SERVER_BASE_URL;

	function validate() {
		console.log('Looks good to me 🫡');
		console.log(`Email: ${email}, Password: ${password}`);
	}

	async function attempt_login() {
		fetch(`${api_base_url}/api/v1/token/`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json;charset=UTF-8'
			},
			body: JSON.stringify({
				username: email,
				email: email,
				password: password
			})
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setCookie('accessToken', data.access, true);
				setCookie('refreshToken', data.refresh, false);

				let newTokens: authTokens = {
					access: data.access,
					refresh: data.refresh
				};
				currentTokens.set(newTokens);

				retrieve_user_info();
			})
			.catch((error) => {
				console.log(error);
				return [];
			});
	}

	async function retrieve_user_info() {
		console.log($currentTokens);
		fetch(`${api_base_url}/api/v1/accounts/user/info`, {
			method: 'GET',
			headers: {
				Authentication: `Bearer ${$currentTokens.access}`
			}
		})
			.then((response) => response.json())
			.then((data) => {
				let newUser: user = {
					name: data.name,
					email: data.email,
					id: data.id
				};
				currentUser.set(newUser);
			})
			.catch((error) => {
				console.log(error);
			});
	}
</script>

<div class="rounded-md border-slate-800 bg-zinc-50 border-2 px-8 pt-8 pb-6 w-2/5">
	<form
		class="flex flex-col items-center gap-y-2 justify-start"
		on:submit|preventDefault={validate}
	>
		<input
			type="email"
			bind:value={email}
			placeholder="steve@jobs.com"
			class="font-sans block text-sm leading-5 w-full py-2 px-3 border border-slate-600 text-slate-500 rounded-sm shadow-sm focus:outline-none focus:ring focus:ring-slate-800 dark:text-slate-400 dark:placeholder:text-slate-600 dark:bg-slate-900"
		/>
		<input
			type="password"
			bind:value={password}
			class="font-sans block text-sm leading-5 w-full py-2 px-3 border border-slate-600 text-slate-500 rounded-sm shadow-sm focus:outline-none focus:ring focus:ring-slate-800 dark:text-slate-400 dark:placeholder:text-slate-600 dark:bg-slate-900"
		/>
		<button
			class="border border-slate-400 hover:border-indigo-400 rounded-md py-1 px-2 w-fit"
			type="submit"
			on:click={attempt_login}
		>
			Login
		</button>
	</form>
</div>
