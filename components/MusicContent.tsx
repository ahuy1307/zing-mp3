"use client";
import { apiUrl } from "@/constant";
import { Song } from "@/interface";
import { useGetTrendingSong } from "@/utils/useGetTrendingSong";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { twMerge } from "tailwind-merge";
import { isTryStatement } from "typescript";
import MusicSong from "./MusicSong";

function MusicContent() {
	const [type, setType] = useState("all");
	const [listSong, setListSong] = useState<Song[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const res = await axios.get(`${apiUrl}/music/trending`, {
					params: {
						_limit: 100,
					},
				});

				const list = useGetTrendingSong(res.data.data, type);
				setListSong(list.filter((item, index) => index < 12));
				setIsLoading(false);
			} catch (error) {
				setIsLoading(false);
			}
		};
		fetchData();
	}, [type]);

	const handleChangeType = (type: string) => {
		setType(type);
	};
	return (
		<div className="text-[var(--text-primary)] px-[10px] md:pl-[100px] xl:pl-[300px] md:px-[30px] xl:px-[60px]">
			<div className="flex justify-between items-center">
				<h1 className="font-bold text-xl xl:text-2xl">Trending</h1>
				<div className="flex items-center text-[var(--text-secondary)] cursor-pointer">
					<span className="uppercase text-xs font-bold">Tất cả</span>
					<AiOutlineRight className="w-[18px] h-[18px]" strokeWidth={3} />
				</div>
			</div>
			<div className="flex gap-x-6 items-center mt-6">
				<button
					className={twMerge(
						`uppercase text-xs px-6 py-1 border-[var(--border-player)] rounded-full bg-[var(--primary-blur-bg)] border`,
						type === "all" && `bg-[var(--purple-primary)] border-[var(--purple-primary)] text-white`
					)}
					onClick={() => handleChangeType("all")}>
					Tất cả
				</button>
				<button
					className={twMerge(
						`uppercase text-xs px-6 py-1 border-[var(--border-player)] rounded-full bg-[var(--primary-blur-bg)] border`,
						type === "vn" && `bg-[var(--purple-primary)] border-[var(--purple-primary)] text-white`
					)}
					onClick={() => handleChangeType("vn")}>
					Việt Nam
				</button>
				<button
					className={twMerge(
						`uppercase text-xs px-6 py-1 border-[var(--border-player)] rounded-full bg-[var(--primary-blur-bg)] border`,
						type === "lobal" && `bg-[var(--purple-primary)] border-[var(--purple-primary)] text-white`
					)}
					onClick={() => handleChangeType("lobal")}>
					Quốc tế
				</button>
			</div>
			<div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4">
				{listSong.map((item) => {
					return <MusicSong key={item._id} song={item} />;
				})}
			</div>
		</div>
	);
}

export default MusicContent;
