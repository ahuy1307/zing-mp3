import { apiUrl } from "@/constant";
import { Song } from "@/interface";

export const getAllTrending = async (type: string): Promise<Song[]> => {
	const res = await fetch(`${apiUrl}/music/trending?_limit=${100}`, { cache: "force-cache" });
	const result = await res.json().then((data) => {
		return data.data;
	});
	const dataFilter = result.filter((item: any) => {
		const category = item.slug_category;
		switch (type) {
			case "all": {
				return category;
			}
			case "usuk": {
				return category === "edm" || category === "pop-au-my";
			}
			case "kpop": {
				return category === "nhac-han";
			}
			case "vn": {
				return category === "nhac-tre";
			}
			case "lobal": {
				return category === "edm" || category === "nhac-han" || category === "pop-au-my";
			}
		}
	});

	return dataFilter;
};
