import { getRequest } from '$lib/util/Requests';
import type { blog_post, blog } from '$lib/interface';

export async function getBlogPosts(token: string): Promise<blog_post[]> {
	return new Promise<blog_post[]>((resolve) => {
		resolve(getRequest('/api/v1/blog/posts/', token));
	});
}

export async function getBlog(token: string): Promise<blog> {
	return new Promise<blog>((resolve) => {
		resolve(getRequest('/api/v1/blog/', token));
	});
}

// Refactor to be single call
