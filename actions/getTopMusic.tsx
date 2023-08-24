import { apiUrl } from "@/constant";
import { Song } from "@/interface";

export const getTopMusic = async (type: string): Promise<Song[]> => {
	let res;
	if (type === "view") {
		res = await fetch(`${apiUrl}/music/top-views?_limit=100`, { cache: "force-cache" });
	} else {
		res = await fetch(`${apiUrl}/music/top-favorite?_limit=100`, { cache: "force-cache" });
	}
	const result = await res.json().then((data) => {
		return data;
	});

	return result.data;
};
