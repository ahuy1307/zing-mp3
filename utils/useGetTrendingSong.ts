import { Song } from "@/interface";

export const useGetTrendingSong = (data: Song[] = [], type: string = "all") => {
	const dataFilter = data.filter((item) => {
		const category = item.slug_category;
		switch (type) {
			case "all": {
				return category;
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
