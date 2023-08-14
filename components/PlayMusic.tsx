"use client";
import { usePlayer } from "@/context/PlayProvider";
import { useListMusic } from "@/hooks/useListMusic";
import { OnlyOneSong, RandomIcon } from "@/icon";
import { Song } from "@/interface";
import { useEffect, useRef, useState } from "react";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { BsFillPlayFill, BsMusicNoteList, BsPauseFill } from "react-icons/bs";
import { twMerge } from "tailwind-merge";
import FavoriteButton from "./FavoriteButton";
import ListSongPlayer from "./ListSongPlayer";

function PlayMusic() {
	const { songActive, listSongData, handleSetNewActiveSong, handleSetPlaying, isPlayingSong } = usePlayer();
	const [isClient, setIsClient] = useState(false);
	const [volume, setVolume] = useState(1);
	const Icon = isPlayingSong ? BsPauseFill : BsFillPlayFill;
	const { onOpen, onClose, isOpen } = useListMusic();
	const thumpRef: any = useRef(null);

	const onNextSong = () => {
		if (listSongData.length === 0) return;

		const index = listSongData.findIndex((item) => item._id === songActive._id);

		if (index === listSongData.length - 1) {
			handleSetNewActiveSong(listSongData[0]);
		} else {
			handleSetNewActiveSong(listSongData[index + 1]);
		}
	};

	const onPrevSong = () => {
		if (listSongData.length === 0) return;

		const index = listSongData.findIndex((item) => item._id === songActive._id);

		if (index === 0) {
			handleSetNewActiveSong(listSongData[listSongData.length - 1]);
		} else {
			handleSetNewActiveSong(listSongData[index - 1]);
		}
	};

	const handlePlaying = () => {
		if (!isPlayingSong) {
			handleSetPlaying(true);
		} else {
			handleSetPlaying(false);
		}
	};

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) return null;
	if (!songActive._id) return null;

	return (
		<>
			<div className="fixed h-[70px] bottom-0 left-0 right-0 bg-[var(--player-bg)] text-[var(--text-primary)] z-[99] md:h-[90px] md:px-[20px]">
				<div className="flex items-center gap-x-4 h-full px-[10px]">
					<img src={songActive.image_music} className={twMerge(`w-[40px] h-[40px] md:w-[64px] md:h-[64px] rounded-full`, isPlayingSong ? `spin` : `returnSpin`)} alt="" />
					<div className="flex flex-col gap-y-1 w-[100px]">
						<h3 className="line-clamp-1">{songActive.name_music}</h3>
						<span className="text-[var(--text-secondary)] text-xs line-clamp-1">{songActive.name_singer}</span>
					</div>
					<div className="flex pl-4">
						<FavoriteButton id={songActive._id} play={true} />
					</div>
					<div className="pl-4 flex flex-col justify-center w-[300px]">
						<div className="flex gap-x-2 items-center md:gap-x-3 justify-center">
							<RandomIcon className="hidden md:block" />
							<div className="hover:bg-[var(--border-player)] rounded-full w-max h-full cursor-pointer">
								<BiSkipPrevious className="w-10 h-10" onClick={onPrevSong} />
							</div>
							<div className="w-max h-full md:border-2 border-black rounded-full p-1 hover:border-[var(--purple-primary)]">
								<Icon className="w-8 h-8 md:relative hover:text-[var(--purple-primary)]" onClick={handlePlaying} />
							</div>
							<div className="hover:bg-[var(--border-player)] rounded-full w-max h-full cursor-pointer">
								<BiSkipNext className="w-10 h-10 " onClick={onNextSong} />
							</div>
							<div className="w-[20px] hidden md:block">
								<OnlyOneSong />
							</div>
						</div>
						<div className="w-full hidden md:flex md:gap-x-2 slider-time md:items-center md:justify-start">
							<span className="font-semibold text-xs pr-2">0:00</span>
							<input type="range" min={1} max={100} name="" id="" className="w-[120%] input-time" />
							<span className="font-semibold text-xs pl-2">{songActive.time_format}</span>
						</div>
					</div>
					<div className="ml-auto">
						<div
							className={twMerge(`bg-[#fff6] p-2 rounded-md cursor-pointer`, isOpen && `bg-[var(--purple-primary)]`)}
							onClick={() => {
								if (isOpen) onClose();
								else onOpen();
							}}>
							<BsMusicNoteList />
						</div>
					</div>
				</div>
			</div>
			<ListSongPlayer />
		</>
	);
}

export default PlayMusic;
