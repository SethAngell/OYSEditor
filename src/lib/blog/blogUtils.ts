import { getRequest } from '$lib/util/Requests';
import type { blog_post, blog } from '$lib/interface';
import { NoBlogConfiguredError } from '$lib/errors';

export async function getBlogPosts(token: string): Promise<blog_post[]> {
	return new Promise<blog_post[]>((resolve) => {
		resolve(getRequest('/api/v1/blog/posts/', token));
	});
}

export async function getBlog(token: string): Promise<blog> {
	return new Promise<blog>((resolve, reject) => {
		getRequest('/api/v1/blog/', token).then((response) => {
			if (response?.detail?.includes('No blog configured for this user. Please create one.')) {
				reject(new NoBlogConfiguredError('No blog has been configured for this account'))
			}
			resolve(response);
		});
	});
}

// Refactor to be single call
