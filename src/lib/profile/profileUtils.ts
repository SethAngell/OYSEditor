import { getRequest } from '$lib/util/Requests';
import type { user, design, profile, experience, profilePicture } from '$lib/interface';

export async function getDesigns(token: string): Promise<design[]> {
	return new Promise<design[]>((resolve) => {
		resolve(getRequest('/api/v1/profiles/designs/', token));
	});
}

export async function getProfile(token: string, userId: number): Promise<profile> {
	return new Promise<profile>((resolve) => {
		resolve(getRequest(`/api/v1/profiles/landing-page/${userId}/`, token));
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

