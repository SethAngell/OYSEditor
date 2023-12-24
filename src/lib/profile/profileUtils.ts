import { getRequest } from '$lib/util/Requests';
import type {
	user,
	design,
	profile,
	experience,
	profilePicture,
	backend_error
} from '$lib/interface';
import { NoProfileConfiguredError } from '$lib/errors';

export async function getDesigns(token: string): Promise<design[]> {
	console.log('Starting Design Retrieval', new Date());
	return new Promise<design[]>((resolve) => {
		resolve(getRequest('/api/v1/profiles/designs/', token));
	});
}

export async function getProfile(token: string, userId: number): Promise<profile> {
	const potential_profile = await getRequest(`/api/v1/profiles/landing-page/${userId}/`, token);

	console.log(potential_profile);

	return new Promise<profile>((resolve, reject) => {
		verifyProfile(potential_profile)
			.then((aProfile) => resolve(aProfile))
			.catch((error) => reject(error));
	});
	// return new Promise<profile>((resolve, reject) => {
	// 	.then((response) => {
	// 		if (response?.detail && !response?.detail?.includes("Not found.")) {
	// 			resolve(response);
	// 		} else if (response?.detail?.includes("Not found.")) {
	// 			reject();
	// 		} else {
	// 			reject(new Error(response));
	// 		}
	// 	})
}

export async function getExperience(token: string): Promise<experience[]> {
	console.log('Starting Experience Retrieval', new Date());

	return new Promise<experience[]>((resolve) => {
		resolve(getRequest(`/api/v1/profiles/experience/`, token));
	});
}

export async function getProfilePicture(token: string, userId: number): Promise<profilePicture> {
	console.log('Starting Profile Picture Retrieval', new Date());

	return new Promise<profilePicture>((resolve) => {
		resolve(getRequest(`/api/v1/profiles/picture/${userId}/`, token));
	});
}

function verifyProfile(potential_profile: profile | backend_error): Promise<profile> {
	return new Promise((resolve, reject) => {
		if (instanceOfBackendError(potential_profile)) {
			reject(new NoProfileConfiguredError('No profile configured for this user'));
		} else {
			resolve(<profile>potential_profile);
		}
	});
}

function instanceOfBackendError(object: any): object is backend_error {
	return 'detail' in object;
}
