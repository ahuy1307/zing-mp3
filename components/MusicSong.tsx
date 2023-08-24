"use client";
import { AiFillHeart, AiOutlineEye, AiOutlineHeart, AiOutlineDownload } from "react-icons/ai";
import { twMerge } from "tailwind-merge";
import { BsThreeDots, BsFillPlayFill } from "react-icons/bs";
import { Skeleton, Tooltip } from "antd";
import { useEffect, useRef, useState } from "react";
import { Song } from "@/interface";
import formatNumber from "@/utils/formatNumber";
import FavoriteButton from "./FavoriteButton";
import Link from "next/link";
import { usePlayer } from "@/context/PlayProvider";
import { useSound } from "use-sound";
import MusicWaves from "./MusicWaves";
import { useHistory } from "@/context/HistoryProvider";
import { useAuth } from "@/context/AuthProvider";

function MusicSong({ song, trending, top, onClick, list, search }: { song: Song; trending?: boolean; top?: number; onClick?: () => void; list?: boolean; search?: boolean }) {
	const [checkHover, setCheckHover] = useState(false);
	const [showOther, setShowOther] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const { songActive, handleSetPlaying, isPlayingSong, handleSetNewActiveSong } = usePlayer();
	const { accessToken } = useAuth();
	const { addHistorySong } = useHistory();

	useEffect(() => {
		if (songActive._id === song._id) {
			setIsPlaying(true);
		} else {
			setIsPlaying(false);
		}
	}, [songActive._id]);

	const handleClick = () => {
		if (songActive._id === song._id) {
			handleSetPlaying(!isPlayingSong);
		} else {
			handleSetPlaying(true);
		}
	};
	return (
		<div
			className={twMerge(
				`grid grid-cols-4 items-center p-[10px]  md:px-[10px] text-[#ffffff80] text-sm border-b-2 border-[#ffffff1a] cursor-pointer group rounded-md hover:bg-[var(--border-player)] relative`,
				isPlaying && `bg-[var(--border-player)]`,
				list && isPlaying && `bg-[var(--purple-primary)] hover:bg-[var(--purple-primary)]`
			)}
			onMouseEnter={() => setCheckHover(true)}
			onMouseLeave={() => {
				setCheckHover(false);
				setShowOther(false);
			}}>
			<div
				className="col-span-4 flex gap-x-4 md:gap-x-4 relative items-center px-[10px]"
				onClick={() => {
					onClick?.();
					if (accessToken !== "") {
						addHistorySong(accessToken, song._id);
					}
					handleSetNewActiveSong(song);
					handleClick();
				}}>
				{top && <span className={twMerge(`stroke-rank`, top === 1 && `rank-1`, top === 2 && `rank-2`, top === 3 && `rank-3`)}>{top}</span>}
				<div className={twMerge(`relative min-w-[50px] w-[50px]`, trending && `min-w-[60px] w-[60px]`, search && `min-w-[50px] w-[50px]`)}>
					<img
						src={song.image_music}
						className={twMerge(
							`w-full h-[50px] object-cover auto-cols-[60px] rounded-md transition-all duration-700 group-hover:brightness-[70%]`,
							trending && `h-[60px]`,
							isPlaying && `brightness-[70%]`,
							search && `h-[50px]`
						)}
						alt=""
					/>
					<BsFillPlayFill
						className={twMerge(
							`w-7 h-7 absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] hidden group-hover:block`,
							isPlaying && `block`,
							isPlayingSong && `hidden group-hover:hidden`,
							!isPlaying && `group-hover:block`
						)}
						color="white"
					/>
					<MusicWaves className={twMerge(`absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] invisible`, isPlaying && isPlayingSong && `visible`)} />
				</div>
				<div className="flex flex-col gap-y-[2px] text-[var(--text-primary)]">
					<h3 className="font-bold line-clamp-1 w-[140px] md:w-[200px]">{song.name_music}</h3>
					<Link href={`/${song.slug_name_singer}`} className="text-[var(--text-secondary)] line-clamp-1 hover:underline text-xs md:w-[150px]">
						{song.name_singer}
					</Link>
					{trending && (
						<div className="flex items-center gap-x-2 text-[var(--text-secondary)]">
							<AiFillHeart />
							{formatNumber(song.favorite, 0)}
						</div>
					)}
				</div>
			</div>
			<span className="absolute top-[50%] translate-y-[-50%] right-4 text-xs group-hover:hidden text-[var(--text-secondary)] font-bold">{song.time_format}</span>
			<div className="absolute right-4">
				<div className="flex items-center gap-x-2 md:gap-x-4">
					{!list && <FavoriteButton id={song._id} />}
					<Tooltip title="Khác" color="black" className="hidden lg:block">
						<BsThreeDots
							color="var(--text-primary)"
							className="w-8 h-8 md:w-9 md:h-9 ml-auto hover:bg-[var(--border-color)] rounded-full p-1 group-hover:visible invisible"
							onClick={() => setShowOther(!showOther)}
						/>
					</Tooltip>
					<BsThreeDots
						color="var(--text-primary)"
						className="w-8 h-8 md:w-9 md:h-9 ml-auto hover:bg-[var(--border-color)] rounded-full p-1 group-hover:visible invisible lg:hidden"
						onClick={() => setShowOther(!showOther)}
					/>
				</div>
				<div
					className={twMerge(
						`absolute right-0 top-0 translate-y-[-100%] bg-[var(--primary-bg)] w-[240px] flex-col rounded-md py-1 scale-0 transition-all duration-300 origin-bottom`,
						showOther && checkHover && `scale-100`
					)}>
					<div className="flex items-center gap-x-2 p-2">
						<img src={song.image_music} className="w-[45px] h-[45px] object-cover rounded-md" alt="" />
						<div className="text-[var(--text-primary)]">
							<h1 className="font-bold">{song.name_music}</h1>
							<div className="flex items-center gap-x-1 text-[var(--text-secondary)]">
								<AiOutlineHeart />
								<span>{formatNumber(song.favorite, 0)}</span>
								<AiOutlineEye />
								<span>{formatNumber(song.view, 0)}</span>
							</div>
						</div>
					</div>
					<div className="flex items-center gap-x-2 py-4 px-2 border-t border-[var(--text-primary)] text-[var(--text-primary)] w-full justify-center font-semibold">
						<AiOutlineDownload className="w-5 h-5" />
						<span>Download</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MusicSong;
