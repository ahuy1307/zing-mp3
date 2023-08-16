"use client";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Song } from "@/interface";
import { createContext, ReactNode, useContext, useState } from "react";

type PlayerContextProps = {
	listSongData: Song[];
	songActive: Song;
	isPlayingSong: boolean;
	isRepeat: boolean;
	isRandom: boolean;
	currentVolume: number;
	timeCurrent: number;
	newTime: number;
	handleSetListSong: (list: Song[]) => void;
	handleSetNewActiveSong: (song: Song) => void;
	handleSetPlaying: (bool: boolean) => void;
	handleSetRandom: (bool: boolean) => void;
	handleSetRepeat: (bool: boolean) => void;
	handleSetVolume: (num: number) => void;
	handleSetTime: (num: number) => void;
	handleSetNewTime: (num: number) => void;
};

const PlayerContext = createContext({} as PlayerContextProps);

export function usePlayer() {
	return useContext(PlayerContext);
}

function PlayerProvider({ children }: { children: ReactNode }) {
	const [listSongData, setListSongData] = useLocalStorage<Song[]>("listSongData", []);
	const [songActive, setSongActive] = useLocalStorage<Song>("songActive", {} as Song);
	const [isPlayingSong, setIsPlayingSong] = useState(false);
	const [currentVolume, setCurrentVolume] = useLocalStorage("currentVolume", 1);
	const [timeCurrent, setTimeCurrent] = useLocalStorage("currentTime", 0);
	const [isRepeat, setIsRepeat] = useLocalStorage("isRepeat", false);
	const [isRandom, setIsRandom] = useLocalStorage("isRandom", false);
	const [newTime, setNewTime] = useState(0);

	const handleSetListSong = (list: Song[]) => {
		setListSongData(list);
	};

	const handleSetNewActiveSong = (song: Song) => {
		setSongActive(song);
	};

	const handleSetPlaying = (bool: boolean) => {
		setIsPlayingSong(bool);
	};

	const handleSetRepeat = (bool: boolean) => {
		setIsRepeat(bool);
	};

	const handleSetRandom = (bool: boolean) => {
		setIsRandom(bool);
	};

	const handleSetVolume = (num: number) => {
		setCurrentVolume(num);
	};

	const handleSetTime = (num: number) => {
		setTimeCurrent(num);
	};

	const handleSetNewTime = (num: number) => {
		setNewTime(num);
	};

	return (
		<PlayerContext.Provider
			value={{
				listSongData,
				songActive,
				handleSetListSong,
				handleSetNewActiveSong,
				isPlayingSong,
				handleSetPlaying,
				handleSetRandom,
				handleSetRepeat,
				isRandom,
				isRepeat,
				currentVolume,
				handleSetVolume,
				timeCurrent,
				handleSetTime,
				newTime,
				handleSetNewTime,
			}}>
			{children}
		</PlayerContext.Provider>
	);
}

export default PlayerProvider;
