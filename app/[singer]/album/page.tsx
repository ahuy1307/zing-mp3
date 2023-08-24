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
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BsFillPlayFill, BsPauseFill } from "react-icons/bs";
import { useQuery } from "react-query";

function SingerAlbum() {
	const pathName = usePathname();
	const nameSinger = pathName.split("/album")[0].split("/")[1];
	const [first, setFirst] = useState(false);
	const { isPlayingSong, handleSetListSong, handleSetPlaying, handleSetNewActiveSong } = usePlayer();
	const { addHistorySong } = useHistory();
	const { accessToken } = useAuth();

	const Icon = isPlayingSong && first ? BsPauseFill : BsFillPlayFill;

	const { data, isLoading } = useQuery({
		queryFn: () => getSingerMusic(decodeURIComponent(nameSinger)),
		queryKey: ["album-singer", { nameSinger }],
	});

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
			<div className="text-[var(--text-primary)] px-[10px] md:pl-[100px] xl:pl-[300px] md:px-[30px] xl:px-[60px]">
				<div className="mt-[100px] px-[10px]">
					{!data && (
						<div className="flex gap-x-2 items-center font-bold text-xl">
							<div className="bg-gray-700/20 w-[300px] rounded-full h-[24px]"></div>
						</div>
					)}
					{data && (
						<>
							<div className="mb-[14px] flex items-center gap-x-2">
								<h1 className="text-[var(--text-primary)] font-bold text-2xl">{data[0].name_singer} - Tất Cả Bài Hát</h1>
								<button
									className="bg-[var(--purple-primary)] rounded-full p-[6px] hover:bg-white hover:ring-2 origin-center transition-all duration-300 group"
									onClick={() => {
										if (!data) return;
										if (!first) {
											handleSetListSong(data);
											if (accessToken !== "") addHistorySong(accessToken, data[0]._id);
											handleSetPlaying(true);
											setFirst(true);
											handleSetNewActiveSong(data[0]);
										} else {
											handleSetPlaying(!isPlayingSong);
										}
									}}>
									<Icon className="w-7 h-7 relative left-[2px] group-hover:text-[var(--purple-primary)] text-white" />
								</button>
							</div>
						</>
					)}
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
			</div>
			<ThemeModal />
			<FormModal />
		</>
	);
}

export default SingerAlbum;
