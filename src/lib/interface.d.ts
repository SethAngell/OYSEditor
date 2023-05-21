export interface user {
	name: string;
	id: int;
	email: string;
}

export interface userInfo {
	user: user;
	token: string;
}

export interface profile {
	user: object;
	name: string;
	bio: string;
	headline: string;
	avatar: string;
	contact_email?: string;
	instagram?: string;
	twitter?: string;
	github?: string;
	spotify?: string;
	linkedin?: string;
	resume?: string;
	favorite_things: object;
	map_overlay?: number;
	template?: number;
}

export interface experience {
	user: number;
	exp_id: number;
	company: string;
	title: string;
	description: string;
	present: boolean;
	start_year: number;
	end_year: number;
	link: url;
	link_title: string;
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

export interface simplified_content {
	id: number;
	name: string;
	url: string;
	doc: boolean;
}

export interface blog_post {
	title: string;
	markdown_body: string;
	html_body: string;
	tags?: number[];
	preview?: string;
	slug: string;
	created_date?: Date;
	updated?: Date;
	visibility: string;
	parent_blog: number;
	open_graph_protocol_description?: string;
}
