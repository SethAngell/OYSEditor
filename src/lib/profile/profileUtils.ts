import { getRequest } from '$lib/util/Requests';
import type { user, design, profile, experience, profilePicture } from '$lib/interface';
import { NoProfileConfiguredError } from '$lib/errors';

export async function getDesigns(token: string): Promise<design[]> {
	return new Promise<design[]>((resolve) => {
		resolve(getRequest('/api/v1/profiles/designs/', token));
	});
}

export async function getProfile(token: string, userId: number): Promise<profile> {
	return new Promise<profile>((resolve, reject) => {
		getRequest(`/api/v1/profiles/landing-page/${userId}/`, token).then((response) => {
			if (response.ok) {
				resolve(response);
			} else if (response?.detail?.includes("Not found.")) {
				reject(new NoProfileConfiguredError('No profile configured for this user'));
			} else {
				reject(new Error(response));
			}
		})

	});
}

export async function getExperience(token: string): Promise<experience[]> {
	return new Promise<experience[]>((resolve) => {
		resolve(getRequest(`/api/v1/profiles/experience/`, token));
	});
}

export async function getProfilePicture(token: string, userId: number): Promise<profilePicture> {
	return new Promise<profilePicture>((resolve) => {
		resolve(getRequest(`/api/v1/profiles/picture/${userId}/`, token))
	})
}

