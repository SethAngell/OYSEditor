export interface user {
	name: string;
	id: int;
	email: string;
}

export interface design_examples {
	example_url: string;
	id: number;
	name: string;
	template_url: string;
}
export interface content_image {
	id: int;
	name: string;
	alt_text: string;
	image: string;
	user: int;
}

export interface content_document {
	id: int;
	name: string;
	downloadable: boolean;
	file: string;
	user: int;
}

export interface user_content {
	images: content_image[];
	documents: content_document[];
}
