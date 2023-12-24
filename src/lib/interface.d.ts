export interface user {
	name: string;
	id: int;
	email: string;
}

export interface profilePicture {
	url?: string;
}

export interface userInfo {
	user: user;
	token: string;
	photo?: profilePicture;
}

export interface profile {
	id?: number;
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

export interface outboundProfile {
	id?: number;
	user?: object;
	name?: string;
	bio?: string;
	headline?: string;
	avatar?: File;
	contact_email?: string;
	instagram?: string;
	twitter?: string;
	github?: string;
	spotify?: string;
	linkedin?: string;
	resume?: File;
	favorite_things?: object;
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

export interface design {
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

export interface blog {
	blog_name: string;
	blog_description: string;
	blog_owner: number;
}

export interface option {
	head?: boolean;
	tail?: boolean;
	next?: option;
	previous?: option;
	payload: design;
}
export interface optionsList {
	options: option[];
}

export interface backend_error {
	detail: string
}