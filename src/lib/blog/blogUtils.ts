import { getRequest } from '$lib/util/Requests';
import type { blog_post } from '$lib/interface';

export async function getBlogPosts(token: string): Promise<blog_post[]> {
	return new Promise<blog_post[]>((resolve) => {
		resolve(getRequest('/api/v1/blog/posts/', token));
	});
}
