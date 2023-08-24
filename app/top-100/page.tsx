"use client";
import { getTopMusic } from "@/actions/getTopMusic";
import FormModal from "@/components/FormModal";
import MusicSong from "@/components/MusicSong";
import Navbar from "@/components/Navbar";
import NavbarMobile from "@/components/NavbarMobile";
import ThemeModal from "@/components/ThemeModal";
import { apiUrl } from "@/constant";
import { useAuth } from "@/context/AuthProvider";
import { useHistory } from "@/context/HistoryProvider";
import { usePlayer } from "@/context/PlayProvider";
import { Song } from "@/interface";
import { Skeleton } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { useQuery } from "react-query";
import { twMerge } from "tailwind-merge";

function Top100() {
	const [type, setType] = useState("view");
	const { handleSetListSong, handleSetNewActiveSong, handleSetPlaying } = usePlayer();
	const { addHistorySong } = useHistory();
	const { accessToken } = useAuth();

	const { data, isLoading } = useQuery({
		queryFn: () => getTopMusic(type),
		queryKey: ["top", { type }],
	});

	const handleChangeType = (type: string) => {
		setType(type);
	};

	const handlePlay = () => {
		handleSetListSong(data!);
	};

	const handlePlayRandom = () => {
		if (!data) return;
		const random = Math.floor(Math.random() * data.length);
		handleSetNewActiveSong(data[random]);
		if (accessToken !== "") addHistorySong(accessToken, data[random]._id);
		handleSetPlaying(true);
	};
	return (
		<>
			<Navbar />
			<NavbarMobile />
			<div className="text-[var(--text-primary)] px-[10px] md:pl-[100px] xl:pl-[300px] md:px-[30px] xl:px-[60px] pb-[80px] md:pb-[120px]">
				<div className="mt-[100px] mb-[42px] flex items-center gap-x-2 px-[10px]">
					<h1 className="text-[var(--text-primary)] font-bold text-2xl">Top Trending</h1>
					<button className="bg-[var(--purple-primary)] rounded-full p-[6px] hover:bg-white hover:ring-2 origin-center transition-all duration-300 group" onClick={handlePlayRandom}>
						<BsFillPlayFill className="w-7 h-7 relative left-[2px] group-hover:text-[var(--purple-primary)] text-white" />
					</button>
				</div>
				<div className="flex gap-x-6 items-center mt-6 text-[var(--text-primary)] px-[10px]">
					<button
						className={twMerge(
							`uppercase text-sm px-6 md:px-10 py-1 border-[var(--border-player)] rounded-full bg-[var(--primary-blur-bg)] border`,
							type === "view" && `bg-[var(--purple-primary)] border-[var(--purple-primary)] text-white`
						)}
						onClick={() => handleChangeType("view")}>
						Top View
					</button>
					<button
						className={twMerge(
							`uppercase text-sm px-5 md:px-8  py-1 border-[var(--border-player)] rounded-full bg-[var(--primary-blur-bg)] border`,
							type === "favorite" && `bg-[var(--purple-primary)] border-[var(--purple-primary)] text-white`
						)}
						onClick={() => handleChangeType("favorite")}>
						Top Favorite
					</button>
				</div>
				<div className="mt-5 grid grid-cols-1 gap-x-2">
					{!data &&
						Array(10)
							.fill(0)
							.map((item, index) => {
								return (
									<div key={index} className="flex gap-x-4 px-[10px] mb-4">
										<div className="bg-gray-700/20 w-[50px] h-[50px] rounded-md"></div>
										<div className="flex flex-col gap-y-3 mt-2">
											<div className="bg-gray-700/20 h-[10px] w-[100px] sm:w-[200px] rounded-md "></div>
											<div className="bg-gray-700/20 h-[10px] w-[200px] sm:w-[400px] rounded-md"></div>
										</div>
									</div>
								);
							})}
					{data &&
						data.map((item, index) => {
							return !isLoading ? (
								<MusicSong key={item._id} song={item} top={index + 1} onClick={handlePlay} />
							) : (
								<div key={item._id} className="flex gap-x-4 pb-3 p-[10px]">
									<Skeleton.Button
										active
										rootClassName="bg-gray-700/30 rounded-md trending-skeleton"
										style={{
											width: "50px",
											height: "50px",
										}}></Skeleton.Button>
									<div className="flex flex-col mt-2">
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
									</div>
								</div>
							);
						})}
				</div>
			</div>
			<ThemeModal />
			<FormModal />
		</>
	);
}

export default Top100;
