export interface IShikimoriTitleResponse {
	id: number;
	name: string;
	russian: string;
	image: {
		original: string;
		preview: string;
		x96: string;
		x48: string;
	}
	url: string;
	kind: string;
	score: string;
	status: string;
	aired_on: string;
	released_on: string;
}

export interface IShikimoriMangasResponse extends IShikimoriTitleResponse {
	volumes: number;
	chapters: number;
}

export interface IShikimoriAnimesResponse extends IShikimoriTitleResponse {
	episodes: number;
	episodes_aired: number;
}