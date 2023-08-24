import { apiUrl } from "@/constant";
import { Song } from "@/interface";
import { getSingerMusic } from "./getSingerMusic";

export const getAlbumSinger = async (name: string, popular: any | undefined): Promise<Song[]> => {
	let res;
	if (popular !== undefined) {
		return await getSingerMusic(name);
	} else {
		res = await fetch(`${apiUrl}/music/top-views?_limit=300`, { cache: "force-cache" });
	}

	const result = await res.json().then((data) => {
		return data;
	});

	return result.data;
};
