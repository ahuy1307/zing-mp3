"use client";
import { Song } from "@/interface";
import formatNumber from "@/utils/formatNumber";
import { Tooltip } from "antd";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineDownload, AiOutlineEye, AiOutlineHeart } from "react-icons/ai";
import { BsFillPlayFill, BsThreeDots } from "react-icons/bs";
import { twMerge } from "tailwind-merge";
import FavoriteButton from "./FavoriteButton";

function SearchItem({ song }: { song: Song }) {
	const [checkHover, setCheckHover] = useState(false);

	const [showOther, setShowOther] = useState(false);

	return (
		<div
			className="grid grid-cols-4 items-center p-[10px] md:px-[10px] text-[#ffffff80] text-sm border-b-2 border-[var(--border-player)] cursor-pointer group hover:bg-[var(--border-player)] rounded-md relative scroll-p-5"
			onMouseEnter={() => setCheckHover(true)}
			onMouseLeave={() => {
				setCheckHover(false);
				setShowOther(false);
			}}>
			<div className="col-span-3 flex gap-x-4 relative">
				<img src={song.image_music} className="w-[40px] h-[40px] object-cover auto-cols-[40px] rounded-md group-hover:brightness-[70%] transition-all duration-700" alt="" />
				<BsFillPlayFill className="w-6 h-6 absolute top-[50%] translate-y-[-50%] left-2 hidden group-hover:block" color="white" />
				<div className="flex flex-col gap-y-[2px] text-[var(--text-primary)] text-sm">
					<h3 className="font-bold">{song.name_music}</h3>
					<Link href={`/${song.slug_name_singer}`} className="text-[var(--text-secondary)] line-clamp-1 hover:underline">
						{song.name_singer}
					</Link>
				</div>
			</div>
			<span className="ml-auto text-xs group-hover:hidden text-[var(--text-secondary)]">{song.time_format}</span>
			<div className="absolute right-4">
				<div className="flex items-center gap-x-2">
					<FavoriteButton id={song._id} />
					<Tooltip title="Khác" color="black">
						<BsThreeDots
							color="var(--text-primary)"
							className="w-7 h-7 ml-auto hover:bg-[var(--border-color)] rounded-full p-1 group-hover:visible invisible"
							onClick={() => setShowOther(true)}
						/>
					</Tooltip>
				</div>
				<div
					className={twMerge(
						`absolute right-0 top-0 translate-y-[-100%] bg-[var(--primary-bg)] w-[240px] flex-col rounded-md py-1 scale-0 transition-all duration-300 origin-bottom shadow-inner`,
						showOther && `scale-100`
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

export default SearchItem;
