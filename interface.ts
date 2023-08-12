export interface Song {
	link_mv: string;
	sum_comment: number | null;
	view: number;
	favorite: number;
	account_favorite: {
		imgae: string;
		user_name: string;
		_id: string;
	};
	_id: string;
	name_singer: string;
	slug_name_singer: string;
	src_music: string;
	image_music: string;
	time_format: string;
	seconds: string;
	name_music: string;
	slug_name_music: string;
	category: string;
	slug_category: string;
	createdAt: Date;
}
