"use client";
import { getFavoriteSong } from "@/actions/getFavoriteSong";
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
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsFillPlayFill } from "react-icons/bs";

function HistoryPage() {
	const { historySong, isLoading, getHistorySongs } = useHistory();
	const { accessToken } = useAuth();
	const { handleSetListSong, handleSetNewActiveSong, handleSetPlaying, songActive } = usePlayer();

	const router = useRouter();

	useEffect(() => {
		if (accessToken === "") {
			router.push("/");
			router.refresh();
		}
		if (accessToken !== "") {
			getHistorySongs(accessToken);
		}
	}, [accessToken, songActive._id]);

	const handlePlay = () => {
		handleSetListSong(historySong);
	};

	const handlePlayRandom = () => {
		const random = Math.floor(Math.random() * historySong.length);
		handleSetNewActiveSong(historySong[random]);
		handleSetPlaying(true);
	};

	return (
		<>
			<Navbar />
			<NavbarMobile />
			<div className="text-[var(--text-primary)] px-[10px] md:pl-[100px] xl:pl-[300px] md:px-[30px] xl:px-[60px] pb-[80px] md:pb-[120px]">
				<div className="mt-[100px] mb-[24px] flex items-center gap-x-2 px-[10px]">
					<h1 className="text-[var(--text-primary)] font-bold text-2xl">Lịch Sử Nghe Nhạc</h1>
					<button className="bg-[var(--purple-primary)] rounded-full p-[6px] hover:bg-white hover:ring-2 origin-center transition-all duration-300 group" onClick={handlePlayRandom}>
						<BsFillPlayFill className="w-7 h-7 relative left-[2px] group-hover:text-[var(--purple-primary)] text-white" />
					</button>
				</div>
				<div className="px-[10px]">
					<div className="mt-4 grid grid-cols-1 gap-x-2">
						{isLoading &&
							historySong.length === 0 &&
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
						{historySong.map((item) => {
							return <MusicSong song={item} key={item._id} onClick={handlePlay} />;
						})}
						{!isLoading && historySong.length === 0 && <span className="text-[var(--text-primary)]">Chưa nghe bài hát nào...</span>}
					</div>
				</div>
			</div>
			<ThemeModal />
			<FormModal />
		</>
	);
}

export default HistoryPage;
