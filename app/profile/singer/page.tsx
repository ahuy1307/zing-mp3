"use client";
import { getFavoriteSong } from "@/actions/getFavoriteSong";
import FormModal from "@/components/FormModal";
import Navbar from "@/components/Navbar";
import NavbarMobile from "@/components/NavbarMobile";
import ThemeModal from "@/components/ThemeModal";
import { apiUrl } from "@/constant";
import { useAuth } from "@/context/AuthProvider";
import { useFavorite } from "@/context/FavoriteProvider";
import { useHistory } from "@/context/HistoryProvider";
import { usePlayer } from "@/context/PlayProvider";
import { RandomIcon } from "@/icon";
import { Song } from "@/interface";
import formatNumber from "@/utils/formatNumber";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

function SingerPage() {
	const { accessToken } = useAuth();
	const { handleSetNewActiveSong, handleSetListSong, handleSetPlaying } = usePlayer();
	const { addHistorySong } = useHistory();

	const checkValueInArray = (
		singer: string,
		arr: {
			singer: string;
			song: Song;
		}[]
	) => {
		const index = arr.findIndex((item) => item.singer === singer);
		return index !== -1;
	};

	const { data } = useQuery({
		queryFn: () => getFavoriteSong(accessToken),
		queryKey: ["favorite", { accessToken }],
	});

	let listSinger: {
		singer: string;
		song: Song;
	}[] = [];

	data &&
		data.map((item) => {
			if (!checkValueInArray(item.name_singer, listSinger)) {
				listSinger.push({
					singer: item.name_singer,
					song: item,
				});
			}
		});

	const handleStartMusic = async (singer: string) => {
		const res = await axios.get(`${apiUrl}/music/get-singer-name`, {
			params: {
				_singer: decodeURIComponent(singer),
			},
		});
		handleSetListSong(res.data.data);
		const random = Math.floor(Math.random() * res.data.data.length);
		addHistorySong(accessToken, res.data.data[random]._id);
		handleSetNewActiveSong(res.data.data[random]);
		handleSetPlaying(true);
	};

	return (
		<>
			<Navbar />
			<NavbarMobile />
			<div className="px-[10px] md:pl-[100px] xl:pl-[300px] md:px-[30px] xl:px-[60px] pb-[80px] md:pb-[120px]">
				<h2 className="mt-[100px] text-2xl text-[var(--text-primary)] font-bold px-[10px]">Nghệ Sĩ</h2>
				<div className="mt-8 overflow-x-scroll scroll-artist flex w-full flex-col gap-y-2 px-[10px]">
					<div className="flex w-full flex-wrap gap-y-8">
						{listSinger &&
							listSinger.map((item, index) => {
								return (
									<>
										<div key={item.singer} className="w-[50%] flex-shrink-0 px-[10px] sm:px-[12px] md:px[24px] sm:w-[33.3%] lg:w-[25%] 2xl:w-[20%]">
											<Link href={`/${item.song.slug_name_singer}`}>
												<div className="relative ">
													<div className="overflow-hidden rounded-full h-0 pb-[100%]">
														<img
															src={item.song.image_music}
															className="rounded-full hover:scale-125 transition-all duration-500 cursor-pointer w-full overflow-hidden"
															alt=""
														/>
													</div>
												</div>
											</Link>
											<Link href={`/${item.song.slug_name_singer}`}>
												<p className="text-center pt-4 text-sm hover:underline hover:text-[var(--purple-primary)] cursor-pointer line-clamp-1 text-[var(--text-primary)]">
													{item.singer}
												</p>
											</Link>
											<p className="text-center pt-2 cursor-pointer text-xs text-[var(--text-secondary)]">{formatNumber(item.song.favorite)} quan tâm</p>
											<button className="flex gap-x-3 mt-2 items-center hover:border-[var(--purple-primary)] border-2 border-transparent group m-auto py-1 px-2 rounded-full">
												<RandomIcon width="18px" height="18px" className="group-hover:text-[var(--purple-primary)] text-[var(--text-primary)]" />
												<span
													className="text-xs font-bold group-hover:text-[var(--purple-primary)] text-[var(--text-primary)]"
													onClick={() => handleStartMusic(item.song.slug_name_singer)}>
													GÓC NHẠC
												</span>
											</button>
										</div>
									</>
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

export default SingerPage;
