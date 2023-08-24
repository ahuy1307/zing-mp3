import { apiUrl } from "@/constant";
import { Song } from "@/interface";

export const getFavoriteSong = async (accessToken: string): Promise<Song[]> => {
	const res = await fetch(`${apiUrl}/favorite/get-authorization-token`, {
		headers: { Authentication: `Bearer ${accessToken}` },
		cache: "force-cache",
	});

	const result = await res.json().then((data) => {
		return data;
	});

	return [
		...result.data.map((item: any) => {
			return item.music;
		}),
	];
};
