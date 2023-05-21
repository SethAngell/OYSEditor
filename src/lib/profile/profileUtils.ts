import { getRequest } from '$lib/util/Requests';
import type { user, design_examples, profile, experience } from '$lib/interface';

export async function getDesigns(token: string): Promise<design_examples[]> {
	return new Promise<design_examples[]>((resolve) => {
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
