"use client";
import { getSingerMusic } from "@/actions/getSingerMusic";
import FormModal from "@/components/FormModal";
import MusicSong from "@/components/MusicSong";
import Navbar from "@/components/Navbar";
import NavbarMobile from "@/components/NavbarMobile";
import ThemeModal from "@/components/ThemeModal";
import { useAuth } from "@/context/AuthProvider";
import { useHistory } from "@/context/HistoryProvider";
import { usePlayer } from "@/context/PlayProvider";
import { Skeleton } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { BsFillPlayFill, BsPauseFill } from "react-icons/bs";
import { useQuery } from "react-query";

function OnlySingerPage() {
	const pathName = usePathname();
	const { handleSetListSong, isPlayingSong, handleSetPlaying, handleSetNewActiveSong } = usePlayer();
	const [first, setFirst] = useState(false); //check click first time

	const Icon = isPlayingSong && first ? BsPauseFill : BsFillPlayFill;
	const { addHistorySong } = useHistory();
	const { accessToken } = useAuth();

	const { data, isLoading } = useQuery({
		queryFn: () => getSingerMusic(decodeURIComponent(pathName.split("/")[1])),
		queryKey: ["singer-song", { pathName }],
	});

	useEffect(() => {
		if (typeof window !== "undefined") {
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	}, []);

	const handlePlay = () => {
		if (!data) return;
		handleSetListSong(data);
		handleSetPlaying(true);
		setFirst(true);
	};

	return (
		<>
			<Navbar />
			<NavbarMobile />
			<div className="text-[var(--text-primary)] px-[10px] md:pl-[100px] xl:pl-[300px] md:px-[30px] xl:px-[60px]  pb-[80px] md:pb-[120px]">
				<div className="relative mt-[100px]">
					{!data && (
						<>
							<div className="flex flex-col items-center gap-y-2 md:hidden">
								<div className="bg-gray-700/20 rounded-full w-[140px] h-[140px]"></div>
								<div className="bg-gray-700/20 w-[100px] h-[30px] rounded-full"></div>
								<div className="bg-gray-700/20 w-[150px] h-[12px] rounded-full"></div>
							</div>
							<div className="gap-y-2 hidden md:flex px-[50px] items-center gap-x-2">
								<div className="bg-gray-700/20 rounded-full w-[180px] h-[180px]"></div>
								<div className="flex flex-col gap-y-6">
									<div className="bg-gray-700/20 w-[100px] h-[30px] rounded-full ml-auto"></div>
									<div className="bg-gray-700/20 w-[150px] h-[12px] rounded-full"></div>
								</div>
							</div>
						</>
					)}
					{data && (
						<div className="flex flex-col md:flex-row md:justify-start md:px-[50px]">
							<img
								src={data[data.length - 1]?.image_music}
								className="rounded-full cursor-pointer object-cover overflow-hidden w-[140px] h-[140px] md:w-[180px] md:h-[180px] m-auto md:m-0"
								alt=""
							/>
							<div className="mb-[14px] justify-center md:items-start mt-[24px] flex flex-col items-center gap-y-2 px-[10px] md:gap-y-8">
								<div className="flex items-center gap-x-2 md:ml-auto">
									<h1 className="text-[var(--text-primary)] font-bold text-2xl md:text-3xl">{data[0].name_singer}</h1>
									<button className="bg-[var(--purple-primary)] rounded-full p-[6px] hover:bg-white hover:ring-2 origin-center transition-all duration-300 group">
										<Icon
											className="w-7 h-7 group-hover:text-[var(--purple-primary)] text-white"
											onClick={() => {
												if (!first) {
													handleSetListSong(data);
													addHistorySong(accessToken, data[0]._id);
													handleSetNewActiveSong(data[0]);
													handleSetPlaying(true);
													setFirst(true);
												} else {
													handleSetPlaying(!isPlayingSong);
												}
											}}
										/>
									</button>
								</div>
								<p className="text-center">{String(data[data.length - 1]?.favorite).replace(/(.)(?=(\d{3})+$)/g, "$1.")} quan tâm</p>
							</div>
						</div>
					)}
					<div className="flex justify-between items-center mt-10 px-[10px]">
						<h1 className="font-bold text-xl xl:text-2xl">Bài Hát Nổi Bật</h1>
						<div className="flex items-center text-[var(--text-secondary)] cursor-pointer">
							<Link href={`${pathName}/album`} className="uppercase text-xs font-bold md:text-base">
								Tất cả
							</Link>
							<AiOutlineRight className="w-[18px] h-[18px]" strokeWidth={3} />
						</div>
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
						{data &&
							data.map((item) => {
								return !isLoading ? (
									<MusicSong key={item._id} song={item} onClick={handlePlay} />
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
			</div>
			<ThemeModal />
			<FormModal />
		</>
	);
}

export default OnlySingerPage;
