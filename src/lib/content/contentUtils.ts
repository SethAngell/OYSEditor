import { getRequest } from '$lib/util/Requests';
import type { user_content } from '$lib/interface';

export async function getUserContent(token: string): Promise<user_content> {
	const userImages = getRequest('/api/v1/content/image/', token).then((newImages) => {
		return newImages;
	});
	const userDocuments = getRequest('/api/v1/content/document/', token).then((newDocuments) => {
		return newDocuments;
	});

	return Promise.all([userImages, userDocuments]).then(([images, docs]) => {
		const content: user_content = {
			images: images,
			documents: docs
		};
		return content;
	});
}
