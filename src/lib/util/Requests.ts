const api_base_url = import.meta.env.VITE_API_SERVER_BASE_URL;

export function getFormattedURL(location: string): string {
	return `${api_base_url}${location}`;
}

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
}

export async function postRequest(endpoint: string, token: string, body: Object) {
	console.log(`Token: ${token} - Endpoint: ${endpoint}`);

	return fetch(`${api_base_url}${endpoint}`, {
		method: 'POST',
		headers: {
			Authorization: `Token ${token}`
		},
		body: JSON.stringify(body)
	})
		.then((response) => response.json())
		.then((data) => data)
		.catch((error) => {
			console.error(error);
		});
}

export async function putRequest(endpoint: string, token: string, body: Object) {
	console.log(`Token: ${token} - Endpoint: ${endpoint}`);

	return fetch(`${api_base_url}${endpoint}`, {
		method: 'PUT',
		headers: {
			Authorization: `Token ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body)
	})
		.then((response) => response.json())
		.then((data) => data)
		.catch((error) => {
			console.error(error);
		});
}
