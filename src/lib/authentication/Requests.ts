import type { authTokens } from '$lib/interface';
import type { Writable } from 'svelte/store';

const api_base_url = import.meta.env.VITE_API_SERVER_BASE_URL;
const timer = (ms) => new Promise((res) => setTimeout(res, ms));

export async function getRequest(endpoint: string, tokenStore: Writable<authTokens>) {
	let tokens: authTokens;
	await waitForStoreHydration(tokenStore)
		.then((newTokens) => {
			if (newTokens.access == null) {
				throw Error('Auth Token store was never hydrated');
			} else {
				return newTokens;
			}
		})
		.then((newTokens) => {
			console.log('Refreshing JWT');
			console.log(newTokens);
			refreshJWT(tokens.refresh, tokens.access);
		});

	// fetch(`${api_base_url}/api/v1/accounts/user/info`, {
	//     method: 'GET',
	//     headers: {
	//         Authentication: `Bearer ${$currentTokens.access}`
	//     }
	// })
	//     .then((response) => response.json())
	//     .then((data) => {
	//         let newUser: user = {
	//             name: data.name,
	//             email: data.email,
	//             id: data.id
	//         };
	//         currentUser.set(newUser);
	//     })
	//     .catch((error) => {
	//         console.log(error);
	//     });
}

async function refreshJWT(refreshToken: string, accessToken: string) {
	return fetch(`${api_base_url}/api/v1/token/refresh/`, {
		method: 'POST',
		headers: {
			Authentication: `Bearer ${accessToken}`,
			'content-type': 'application/json;charset=UTF-8'
		},
		body: JSON.stringify({
			refresh: refreshToken
		})
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
		})
		.catch((error) => {
			console.log(error);
		});
}

async function waitForStoreHydration(tokenStore: Writable<authTokens>) {
	let timeout = 0;
	let newTokens: authTokens = { refresh: '', access: '' };

	tokenStore.subscribe((newVal) => {
		console.log(newVal);
		newTokens = newVal;
	});

	while (timeout < 5) {
		console.log(`Iteration ${timeout}`);
		if (newTokens?.access) {
			return newTokens;
		} else {
			await timer(3000);
			timeout++;
		}
	}

	return {
		access: '',
		refresh: ''
	};
}
