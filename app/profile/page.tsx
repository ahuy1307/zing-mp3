"use client";
import FormModal from "@/components/FormModal";
import MusicSong from "@/components/MusicSong";
import Navbar from "@/components/Navbar";
import NavbarMobile from "@/components/NavbarMobile";
import ThemeModal from "@/components/ThemeModal";
import { useAuth } from "@/context/AuthProvider";
import { useFavorite } from "@/context/FavoriteProvider";
import { RandomIcon } from "@/icon";
import { Song } from "@/interface";
import SkeletonAvatar from "antd/es/skeleton/Avatar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

function ProfilePage() {
	const { favoriteSongs, getFavoriteSongs, isLoading } = useFavorite();
	const { accessToken } = useAuth();
	const [listSinger, setListSinger] = useState<{ singer: string; song: Song }[]>([]);
	const [widthCurrent, setWidthCurrent] = useState(0);

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

	const handleSize = () => {
		if (typeof window !== "undefined") setWidthCurrent(window.innerWidth);
	};
	useEffect(() => {
		if (accessToken !== "") {
			getFavoriteSongs(accessToken);
		}

		let list: {
			singer: string;
			song: Song;
		}[] = [];

		favoriteSongs.map((item) => {
			if (!checkValueInArray(item.music.name_singer, list)) {
				list.push({
					singer: item.music.name_singer,
					song: item.music,
				});
			}
		});
		setListSinger([...list]);

		if (typeof window !== "undefined") setWidthCurrent(window.innerWidth);

		window.addEventListener("resize", handleSize, { passive: true });

		return () => window.removeEventListener("resize", handleSize);
	}, [favoriteSongs.length]);

	return (
		<>
			<Navbar />
			<NavbarMobile />
			<div className="text-[var(--text-primary)] px-[10px] md:pl-[100px] xl:pl-[300px] md:px-[30px] xl:px-[60px]">
				<div className="mt-[100px] mb-[24px] flex items-center gap-x-2 px-[10px]">
					<h1 className="text-[var(--text-primary)] font-bold text-2xl">Thư Viện</h1>
					<button className="bg-[var(--purple-primary)] rounded-full p-[6px] hover:bg-white hover:ring-2 origin-center transition-all duration-300 group">
						<BsFillPlayFill className="w-7 h-7 relative left-[2px] group-hover:text-[var(--purple-primary)] text-white" />
					</button>
				</div>
				<div className="px-[10px]">
					<h2 className="text-2xl font-bold">Nghệ Sĩ</h2>
					<div className="mt-8 overflow-x-scroll scroll-artist flex w-full flex-col gap-y-2">
						{!isLoading && favoriteSongs.length === 0 && <span className="text-[var(--text-primary)]">Chưa thêm nghệ sĩ nào vào thư viện...</span>}
						<div className="flex w-full">
							{isLoading &&
								favoriteSongs.length === 0 &&
								Array(5)
									.fill(0)
									.map((item, index) => {
										return (
											<div key={index} className="w-[50%] flex-shrink-0 px-[10px] sm:px-[12px] md:px[16px] sm:w-[33.3%] lg:w-[25%] xl:w-[20%] group cursor-pointer">
												<div className="relative h-[200px] rounded-full shadow bg-gray-700/20"></div>
											</div>
										);
									})}
							{listSinger.map((item, index) => {
								return (
									<>
										<div
											key={item.singer}
											className={twMerge(
												`w-[50%] flex-shrink-0 px-[10px] sm:px-[12px] md:px[16px] sm:w-[33.3%] lg:w-[25%] xl:w-[20%]`,
												widthCurrent <= 1279 && index > 2 && `lg:hidden`,
												widthCurrent >= 1280 && index > 3 && `xl:hidden`
											)}>
											<Link href={`/${item.song.slug_name_singer}`}>
												<div className="relative ">
													<div className="overflow-hidden rounded-full h-0 pb-[100%]">
														<img
															src={item.song.image_music}
															className="rounded-full hover:scale-125 transition-all duration-500 cursor-pointer w-full overflow-hidden"
															alt=""
														/>
													</div>
													<div className="absolute right-4 bottom-2 shadow bg-white p-2 rounded-full cursor-pointer">
														<RandomIcon />
													</div>
												</div>
											</Link>
										</div>
										{index === listSinger.length - 1 && (
											<div className="w-[50%] flex-shrink-0 px-[10px] sm:px-[12px] md:px[16px] sm:w-[33.3%] lg:w-[25%] 2xl:w-[20%] group cursor-pointer">
												<Link href="/profile/singer">
													<div className="relative h-full">
														<div className="overflow-hidden rounded-full shadow-2xl h-full">
															<span className="w-[100%] h-auto absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] m-auto">
																<AiOutlineArrowRight className="w-8 h-8 m-auto group-hover:text-[var(--purple-primary)]" />
															</span>
														</div>
														<div className="absolute right-4 bottom-4 shadow bg-white p-2 rounded-full cursor-pointer">
															<RandomIcon />
														</div>
													</div>
												</Link>
											</div>
										)}
									</>
								);
							})}
						</div>
						<div className="flex w-full">
							{listSinger.map((item, index) => {
								return (
									<>
										<div
											key={item.singer}
											className={twMerge(
												`w-[50%] flex-shrink-0 px-[10px] sm:px-[12px] md:px[16px] sm:w-[33.3%] lg:w-[25%] 2xl:w-[20%]`,
												widthCurrent <= 1279 && index > 2 && `lg:hidden`,
												widthCurrent >= 1280 && index > 3 && `xl:hidden`
											)}>
											<Link href={`${item.song.slug_name_singer}`}>
												<p className="text-center pt-2 text-sm hover:underline hover:text-[var(--purple-primary)] cursor-pointer line-clamp-1">{item.singer}</p>
											</Link>
										</div>
										{index === listSinger.length - 1 && (
											<div className="w-[50%] flex-shrink-0 px-[10px] sm:px-[12px] md:px[16px] sm:w-[33.3%] lg:w-[25%] 2xl:w-[20%] group cursor-pointer">
												<Link href="/profile/singer">
													<p className="text-center pt-2 text-sm hover:underline hover:text-[var(--purple-primary)] cursor-pointer">Xem tất cả</p>
												</Link>
											</div>
										)}
									</>
								);
							})}
						</div>
					</div>
					<h2 className="text-2xl font-bold mt-7">Playlist Favorite</h2>
					<div className="mt-4 grid grid-cols-1 gap-x-2">
						{isLoading &&
							favoriteSongs.length === 0 &&
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
						{favoriteSongs.map((item) => {
							return <MusicSong song={item.music} key={item.music._id} trending={true} />;
						})}
						{!isLoading && favoriteSongs.length === 0 && <span className="text-[var(--text-primary)]">Chưa thêm bài hát nào vào thư viện...</span>}
					</div>
				</div>
			</div>
			<ThemeModal />
			<FormModal />
		</>
	);
}

export default ProfilePage;
