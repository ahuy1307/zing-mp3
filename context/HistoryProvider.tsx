"use client";
import { apiUrl } from "@/constant";
import { Song } from "@/interface";
import axios from "axios";
import { createContext, ReactNode, useContext, useState } from "react";

type HistoryProps = {
	historySong: Song[];
	isLoading: boolean;
	getHistorySongs: (accessToken: string) => void;
	addHistorySong: (accessToken: string, id: string) => void;
};

const HistoryContext = createContext({} as HistoryProps);

export function useHistory() {
	return useContext(HistoryContext);
}

function HistoryProvider({ children }: { children: ReactNode }) {
	const [historySong, setHistorySong] = useState<Song[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const getHistorySongs = async (accessToken: string) => {
		if (accessToken === "") {
			setHistorySong([]);
			return;
		}
		setIsLoading(true);
		try {
			const res = await axios.get(`${apiUrl}/play-history/get-by-token`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
			res.data.data.map((item: any) => {
				setHistorySong((prev) => {
					return [...prev, item.music];
				});
			});
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
		}
	};

	const addHistorySong = async (accessToken: string, id: string) => {
		try {
			const res = await axios.post(
				`${apiUrl}/play-history/create`,
				{ idMusic: id },
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
		} catch (error) {
			console.log(error);
		}
	};
	return <HistoryContext.Provider value={{ historySong, addHistorySong, getHistorySongs, isLoading }}>{children}</HistoryContext.Provider>;
}

export default HistoryProvider;
