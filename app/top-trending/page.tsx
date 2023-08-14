"use client";
import FormModal from "@/components/FormModal";
import MusicSong from "@/components/MusicSong";
import Navbar from "@/components/Navbar";
import NavbarMobile from "@/components/NavbarMobile";
import ThemeModal from "@/components/ThemeModal";
import { apiUrl } from "@/constant";
import { usePlayer } from "@/context/PlayProvider";
import { Song } from "@/interface";
import { useGetTrendingSong } from "@/utils/useGetTrendingSong";
import { Skeleton } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

function TopTrending() {
	const [type, setType] = useState("all");
	const [listSong, setListSong] = useState<Song[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const { handleSetListSong, handleSetNewActiveSong, handleSetPlaying } = usePlayer();

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
				setListSong(list);
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

	const handlePlay = () => {
		handleSetListSong(listSong);
	};

	const handlePlayRandom = () => {
		const random = Math.floor(Math.random() * listSong.length);
		handleSetNewActiveSong(listSong[random]);
		handleSetPlaying(true);
	};
	return (
		<>
			<Navbar />
			<NavbarMobile />
			<div className="text-[var(--text-primary)] px-[10px] md:pl-[100px] xl:pl-[300px] md:px-[30px] xl:px-[60px]">
				<div className="mt-[100px] mb-[42px] flex items-center gap-x-2 px-[10px]">
					<h1 className="text-[var(--text-primary)] font-bold text-2xl">Top Trending</h1>
					<button className="bg-[var(--purple-primary)] rounded-full p-[6px] hover:bg-white hover:ring-2 origin-center transition-all duration-300 group" onClick={handlePlayRandom}>
						<BsFillPlayFill className="w-7 h-7 relative left-[2px] group-hover:text-[var(--purple-primary)] text-white" />
					</button>
				</div>
				<div className="flex gap-x-6 items-center mt-6 text-[var(--text-primary)] px-[10px]">
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
							`uppercase text-xs px-5 md:px-8  py-1 border-[var(--border-player)] rounded-full bg-[var(--primary-blur-bg)] border`,
							type === "vn" && `bg-[var(--purple-primary)] border-[var(--purple-primary)] text-white`
						)}
						onClick={() => handleChangeType("vn")}>
						Việt Nam
					</button>
					<button
						className={twMerge(
							`uppercase text-xs px-5 md:px-8  py-1 border-[var(--border-player)] rounded-full bg-[var(--primary-blur-bg)] border`,
							type === "kpop" && `bg-[var(--purple-primary)] border-[var(--purple-primary)] text-white`
						)}
						onClick={() => handleChangeType("kpop")}>
						Hàn Quốc
					</button>
					<button
						className={twMerge(
							`uppercase text-xs px-5 md:px-10  py-1 border-[var(--border-player)] rounded-full bg-[var(--primary-blur-bg)] border`,
							type === "usuk" && `bg-[var(--purple-primary)] border-[var(--purple-primary)] text-white`
						)}
						onClick={() => handleChangeType("usuk")}>
						Âu Mỹ
					</button>
				</div>
				<div className="mt-5 grid grid-cols-1 gap-x-2">
					{listSong.length === 0 &&
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
					{listSong.map((item) => {
						return !isLoading ? (
							<MusicSong key={item._id} song={item} onClick={handlePlay} />
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

export default TopTrending;
