"use client";
import { useState } from "react";
import { AiOutlineRight, AiFillHeart, AiOutlineEye, AiOutlineHeart, AiOutlineDownload } from "react-icons/ai";
import { twMerge } from "tailwind-merge";
import { BsThreeDots, BsFillPlayFill } from "react-icons/bs";
import { Tooltip } from "antd";
import MusicSong from "./MusicSong";

function MusicContent() {
	const [type, setType] = useState("all");

	const handleChangeType = (type: string) => {
		setType(type);
	};
	let data: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
	return (
		<div className="text-white px-[10px] md:pl-[100px] xl:pl-[300px] md:px-[30px] lg:pl-[270px] xl:px-[60px]">
			<div className="flex justify-between items-center">
				<h1 className="font-bold text-xl">Trending</h1>
				<div className="flex items-center text-gray-500 cursor-pointer">
					<span className="uppercase text-xs font-bold">Tất cả</span>
					<AiOutlineRight className="w-[18px] h-[18px]" strokeWidth={3} />
				</div>
			</div>
			<div className="flex gap-x-6 items-center mt-6">
				<button className={twMerge(`uppercase text-xs px-6 py-1 border rounded-full bg-black`, type === "all" && `bg-[#9b4ddf] border-[#9b4ddf]`)} onClick={() => handleChangeType("all")}>
					Tất cả
				</button>
				<button className={twMerge(`uppercase text-xs px-6 py-1 border rounded-full bg-black`, type === "vn" && `bg-[#9b4ddf] border-[#9b4ddf]`)} onClick={() => handleChangeType("vn")}>
					Việt Nam
				</button>
				<button
					className={twMerge(`uppercase text-xs px-6 py-1 border rounded-full bg-black`, type === "foreign" && `bg-[#9b4ddf] border-[#9b4ddf]`)}
					onClick={() => handleChangeType("foreign")}>
					Quốc tế
				</button>
			</div>
			<div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4">
				{data.map((item) => {
					return <MusicSong key={item} />;
				})}
			</div>
		</div>
	);
}

export default MusicContent;
