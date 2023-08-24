import { apiUrl } from "@/constant";
import { Song } from "@/interface";

export const getSingerMusic = async (name: string): Promise<Song[]> => {
	const res = await fetch(`${apiUrl}/music/get-singer-name?_singer=${name}`, { cache: "force-cache" });
	const result = await res.json().then((data) => {
		return data;
	});

	return result.data;
};
