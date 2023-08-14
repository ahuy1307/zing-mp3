"use client";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Song } from "@/interface";
import { createContext, ReactNode, useContext, useState } from "react";

type PlayerContextProps = {
	listSongData: Song[];
	songActive: Song;
	isPlayingSong: boolean;
	handleSetListSong: (list: Song[]) => void;
	handleSetNewActiveSong: (song: Song) => void;
	handleSetPlaying: (bool: boolean) => void;
};

const PlayerContext = createContext({} as PlayerContextProps);

export function usePlayer() {
	return useContext(PlayerContext);
}

function PlayerProvider({ children }: { children: ReactNode }) {
	const [listSongData, setListSongData] = useLocalStorage<Song[]>("listSongData", []);
	const [songActive, setSongActive] = useLocalStorage<Song>("songActive", {} as Song);
	const [isPlayingSong, setIsPlayingSong] = useState(false);

	const handleSetListSong = (list: Song[]) => {
		setListSongData(list);
	};

	const handleSetNewActiveSong = (song: Song) => {
		setSongActive(song);
	};

	const handleSetPlaying = (bool: boolean) => {
		setIsPlayingSong(bool);
	};

	return <PlayerContext.Provider value={{ listSongData, songActive, handleSetListSong, handleSetNewActiveSong, isPlayingSong, handleSetPlaying }}>{children}</PlayerContext.Provider>;
}

export default PlayerProvider;
