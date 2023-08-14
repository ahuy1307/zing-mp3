"use client";

import { usePlayer } from "@/context/PlayProvider";
import { useListMusic } from "@/hooks/useListMusic";
import { Song } from "@/interface";
import { useEffect } from "react";
import { BsFillPlayFill, BsPauseFill } from "react-icons/bs";
import { twMerge } from "tailwind-merge";
import MusicSong from "./MusicSong";

function ListSongPlayer() {
	const { listSongData, isPlayingSong, songActive, handleSetNewActiveSong, handleSetPlaying } = usePlayer();
	const { isOpen } = useListMusic();
	const Icon = isPlayingSong ? BsPauseFill : BsFillPlayFill;

	useEffect(() => {
		document.getElementById(songActive._id)?.scrollIntoView({
			behavior: "smooth",
			block: "end",
		});
	}, [songActive]);

	const handlePlay = (item: Song) => {
		if (songActive._id === item._id) {
			handleSetPlaying(!isPlayingSong);
		} else {
			handleSetNewActiveSong(item);
			handleSetPlaying(true);
		}
	};

	return (
		<div
			className={twMerge(
				`bg-[var(--primary-bg)] fixed right-0 top-0 botttom-0 w-[330px] h-[calc(100vh-70px)] z-50 px-[10px] translate-x-[100%] transition-all duration-500 opacity-0 overflow-hidden overflow-y-scroll scroll-search	`,
				isOpen && `translate-x-[0] opacity-100`
			)}>
			<div className="flex items-center py-[10px] mt-[20px] gap-x-3 text-[var(--text-primary)] fixed w-full h-[50px] top-0 left-4 right-0">
				<span className="font-bold text-2xl">Danh Sách Phát</span>
				<button
					className="bg-[var(--purple-primary)] rounded-full p-[6px] hover:bg-white hover:ring-2 origin-center transition-all duration-300 group"
					onClick={() => handleSetPlaying(!isPlayingSong)}>
					<Icon className="w-7 h-7 relative left-[1px] group-hover:text-[var(--purple-primary)] text-white" />
				</button>
			</div>
			<div className="grid grid-cols-1 mt-[100px]">
				{listSongData.map((item, index) => {
					return (
						<div key={index} id={item._id} onClick={() => handlePlay(item)}>
							<MusicSong song={item} list={true} />
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default ListSongPlayer;
