import { apiUrl } from "@/constant";
import { Song } from "@/interface";

export const getNewSong = async (): Promise<Song[]> => {
	const res = await fetch(`${apiUrl}/music/new-music?_limit=100`, { cache: "force-cache" });

	const result = await res.json().then((data) => {
		return data;
	});

	return result.data;
};
