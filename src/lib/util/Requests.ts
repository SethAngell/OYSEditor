// import type { Writable } from 'svelte/store';
// import { get } from 'svelte/store';
// import { getContext } from 'svelte';

const api_base_url = import.meta.env.VITE_API_SERVER_BASE_URL;
// const timer = (ms) => new Promise((res) => setTimeout(res, ms));

// const tokenStore: Writable<string> = getContext('currentAuthToken');
// const token: string = get(tokenStore);

export async function getRequest(endpoint: string, token: string) {
	console.log(`Token: ${token} - Endpoint: ${endpoint}`);

	return fetch(`${api_base_url}${endpoint}`, {
		method: 'GET',
		headers: {
			Authorization: `Token ${token}`
		}
	})
		.then((response) => response.json())
		.then((data) => data)
		.catch((error) => {
			console.error(error);
		});

	// fetch(`${api_base_url}/api/v1/accounts/user/info`, {
	//     method: 'GET',
	//     headers: {{}
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
