"use client";
import { apiUrl } from "@/constant";
import { Song } from "@/interface";
import axios from "axios";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

type FavoriteProps = {
	favoriteSongs: {
		id_music: string;
		music: Song;
	}[];
	isLoading: boolean;
	getFavoriteSongs: (accessToken: string) => void;
	addFavoriteSong: (accessToken: string, id: string) => void;
	removeFavoriteSong: (accessToken: string, id: string) => void;
};

const FavoriteContext = createContext({} as FavoriteProps);

export function useFavorite() {
	return useContext(FavoriteContext);
}

export default function FavoriteProvider({ children }: { children: ReactNode }) {
	const [isLoading, setIsLoading] = useState(false);
	const [favoriteSongs, setFavoriteSongs] = useState([]);

	const getFavoriteSongs = async (accessToken: string) => {
		if (accessToken === "") {
			setFavoriteSongs([]);
			return;
		}
		setIsLoading(true);

		try {
			const res = await axios.get(`${apiUrl}/favorite/get-authorization-token`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
			setIsLoading(false);
			setFavoriteSongs(res.data.data);
		} catch (error) {
			setIsLoading(false);
		}
	};

	const addFavoriteSong = async (accessToken: string, id: string) => {
		try {
			const res = await axios.post(
				`${apiUrl}/favorite/create`,
				{ idMusic: id, Response: { message: '"Create favorite success' } },
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			if (res.status === 200) {
				toast.success(res.data.message);
				getFavoriteSongs(accessToken);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const removeFavoriteSong = async (accessToken: string, id: string) => {
		try {
			const res = await axios.post(
				`${apiUrl}/favorite/create`,
				{ idMusic: id, Response: { message: '"Delete favorite success' } },
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			if (res.status === 200) {
				toast.success(res.data.message);
				getFavoriteSongs(accessToken);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return <FavoriteContext.Provider value={{ favoriteSongs, isLoading, addFavoriteSong, removeFavoriteSong, getFavoriteSongs }}>{children}</FavoriteContext.Provider>;
}
