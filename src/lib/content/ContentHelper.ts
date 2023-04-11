import type { content_document, content_image, user_content } from '$lib/interface';
import { getRequest } from '$lib/util/Requests';

export async function getAllUserContent(token: string) {
	let userContent: user_content = {
		images: new Array<content_image>(),
		documents: new Array<content_document>()
	};

	await getRequest('/api/v1/content/image/', token).then((userImages) => {
		Object.values(userImages).forEach((image) => {
			userContent.images.push(image as content_image);
		});
	});

	await getRequest('/api/v1/content/document/', token).then((userDocuments) => {
		Object.values(userDocuments).forEach((document) => {
			userContent.documents.push(document as content_document);
		});
	});

	return new Promise((resolve, reject) => {
		if (userContent) {
			resolve(userContent);
		} else {
			reject(new Error('Unable to retrieve objects!'));
		}
	});
}
