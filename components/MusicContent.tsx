"use client";
import { getAllTrending } from "@/actions/getTrendingType";
import { usePlayer } from "@/context/PlayProvider";
import { Skeleton } from "antd";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { useQuery } from "react-query";
import { twMerge } from "tailwind-merge";
import MusicSong from "./MusicSong";

function MusicContent() {
	const [type, setType] = useState("all");
	const { handleSetListSong } = usePlayer();

	const { data, isLoading } = useQuery({
		queryFn: () => getAllTrending(type!),
		queryKey: ["trending", { type }],
	});

	const handleChangeType = (type: string) => {
		setType(type);
	};

	const handlePlay = () => {
		handleSetListSong(data!);
	};

	const listMap = data && [...data!.filter((item: any, index: number) => index < 12)];

	return (
		<>
			<div className="text-[var(--text-primary)] px-[10px] md:pl-[100px] xl:pl-[300px] md:px-[30px] xl:px-[60px]">
				<div className="flex justify-between items-center">
					<h1 className="font-bold text-xl xl:text-2xl">Trending</h1>
					<div className="flex items-center text-[var(--text-secondary)] cursor-pointer">
						<Link href="/top-trending" className="uppercase text-xs font-bold md:text-base">
							Tất cả
						</Link>
						<AiOutlineRight className="w-[18px] h-[18px]" strokeWidth={3} />
					</div>
				</div>
				<div className="flex gap-x-6 items-center mt-6">
					<button
						className={twMerge(
							`uppercase text-xs px-6 md:px-10 py-1 border-[var(--border-player)] rounded-full bg-[var(--primary-blur-bg)] border`,
							type === "all" && `bg-[var(--purple-primary)] border-[var(--purple-primary)] text-white`
						)}
						onClick={() => handleChangeType("all")}>
						Tất cả
					</button>
					<button
						className={twMerge(
							`uppercase text-xs px-6 md:px-8 py-1 border-[var(--border-player)] rounded-full bg-[var(--primary-blur-bg)] border`,
							type === "vn" && `bg-[var(--purple-primary)] border-[var(--purple-primary)] text-white`
						)}
						onClick={() => handleChangeType("vn")}>
						Việt Nam
					</button>
					<button
						className={twMerge(
							`uppercase text-xs px-6 md:px-8 py-1 border-[var(--border-player)] rounded-full bg-[var(--primary-blur-bg)] border`,
							type === "lobal" && `bg-[var(--purple-primary)] border-[var(--purple-primary)] text-white`
						)}
						onClick={() => handleChangeType("lobal")}>
						Quốc tế
					</button>
				</div>
				<div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4">
					{!data &&
						Array(12)
							.fill(0)
							.map((item, index) => {
								return (
									<div key={index} className="flex gap-x-4 px-[10px] mb-4">
										<div className="bg-gray-700/20 w-[60px] h-[60px] rounded-md"></div>
										<div className="flex flex-col gap-y-3">
											<div className="bg-gray-700/20 h-[10px] w-[100px] rounded-md"></div>
											<div className="bg-gray-700/20 h-[10px] w-[200px] rounded-md"></div>
											<div className="bg-gray-700/20 h-[10px] w-[100px] rounded-md"></div>
										</div>
									</div>
								);
							})}
					{listMap &&
						listMap.map((item) => {
							return !isLoading ? (
								<MusicSong key={item._id} song={item} trending={true} onClick={handlePlay} />
							) : (
								<div key={item._id} className="flex gap-x-4 pb-3 p-[10px]">
									<Skeleton.Button
										active
										rootClassName="bg-gray-700/30 rounded-md"
										style={{
											width: "60px",
											height: "60px",
										}}></Skeleton.Button>
									<div className="flex flex-col">
										<Skeleton.Button
											active
											size="large"
											style={{
												height: "10px",
											}}
										/>
										<Skeleton.Input
											active
											size="large"
											style={{
												height: "10px",
											}}
										/>
										<Skeleton.Button
											active
											size="large"
											style={{
												height: "10px",
											}}
										/>
									</div>
								</div>
							);
						})}
				</div>
			</div>
		</>
	);
}

export default MusicContent;
