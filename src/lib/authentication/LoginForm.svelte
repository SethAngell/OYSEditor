<script lang="ts">
	import type { user, userInfo } from '$lib/interface';
	import type { Writable } from 'svelte/store';

	import { getContext, onMount, setContext } from 'svelte';
	import { page } from '$app/stores';
	import { InvalidLoginError } from '$lib/errors';

	import { setCookie } from '$lib/authentication/AuthManager';
	import { json } from '@sveltejs/kit';

	const currentToken: Writable<string> = getContext('currentAuthToken');
	const currentUserInfo: Writable<userInfo> = getContext('currentUserInfo');
	const urlContent = $page.url;

	let redirect = urlContent.searchParams.get('redirect')
		? urlContent.searchParams.get('redirect')
		: '/home';

	let email: HTMLInputElement;
	let password: HTMLInputElement;
	let api_base_url = import.meta.env.VITE_API_SERVER_BASE_URL;

	function validate() {
		console.log('Looks good to me 🫡');
		console.log(`Email: ${email.value}, Password: ${password.value}`);
	}

	async function attempt_login() {
		var basicAuthHeader: string = `${email.value}:${password.value}`;
		fetch(`${api_base_url}/api/v1/token/login/`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json;charset=UTF-8',
				Authorization: `Basic ${btoa(basicAuthHeader)}`
			}
		})
			.then((response) => {
				if (response.status == 401) {
					throw new InvalidLoginError('Invalid username or password');
				} else {
					return response.json();
				}
			})
			.then((data) => {
				setCookie('AccessToken', data.token, false);
				currentToken.set(data.Token);

				var loggedInUser: user = {
					name: data.user.name,
					id: data.user.id,
					email: data.user.email
				};
				currentUserInfo.set({
					user: loggedInUser,
					token: data.token
				});

				setCookie('UserInfo', JSON.stringify({ user: loggedInUser, token: data.token }), false);
				location.href = redirect as string;
			})
			.catch((error) => {
				if (error instanceof InvalidLoginError) {
					email.setCustomValidity('Invalid Email Or Password');
					password.setCustomValidity('Invalid Email Or Password');
				}
				console.error(error);
			});
	}

	onMount(async () => {
		email.addEventListener('input', () => {
			if (!email.validity.valid) {
				email.setCustomValidity('');
				password.setCustomValidity('');
			}
		});
		password.addEventListener('input', () => {
			if (!email.validity.valid) {
				email.setCustomValidity('');
				password.setCustomValidity('');
			}
		});
	});
</script>

<div class="rounded-md border-slate-800 bg-zinc-50 border-2 px-8 pt-8 pb-6 w-2/5">
	<form
		class="flex flex-col items-center gap-y-2 justify-start"
		on:submit|preventDefault={attempt_login}>
		<div id="email-container" class="flex flex-col w-full justify-start gap-y-2 karla">
			<p class="text-sm font-bold uppercase">Email:</p>
			<input
				type="email"
				bind:this={email}
				placeholder="steve@jobs.com"
				class="font-sans block text-sm leading-5 w-full py-2 px-3 border border-slate-600 text-slate-500 rounded-sm shadow-sm focus:outline-none focus:ring focus:ring-slate-800 dark:text-slate-400 dark:placeholder:text-slate-600 dark:bg-slate-900 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" />
		</div>
		<div id="password-container" class="flex flex-col w-full justify-start gap-y-2 karla">
			<p class="text-sm font-bold uppercase">Password:</p>
			<input
				type="password"
				bind:this={password}
				placeholder="•••••••••••••••••••"
				class="peer font-sans block text-sm leading-5 w-full py-2 px-3 border border-slate-600 text-slate-500 rounded-sm shadow-sm focus:outline-none focus:ring focus:ring-slate-800 dark:text-slate-400 dark:placeholder:text-slate-600 dark:bg-slate-900 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" />
			<p class="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
				Invalid Email/Password Combination. Please try again.
			</p>
		</div>
		<button
			class="border border-slate-400 hover:border-indigo-400 rounded-md py-1 px-2 w-fit"
			type="submit"
			tabindex="0">
			Login
		</button>
	</form>
</div>
