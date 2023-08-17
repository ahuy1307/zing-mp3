"use client";
import FormModal from "@/components/FormModal";
import MusicSong from "@/components/MusicSong";
import MusicWaves from "@/components/MusicWaves";
import Navbar from "@/components/Navbar";
import NavbarMobile from "@/components/NavbarMobile";
import ThemeModal from "@/components/ThemeModal";
import { apiUrl } from "@/constant";
import { usePlayer } from "@/context/PlayProvider";
import { hotAlbum, popularAlbum } from "@/dataAlbum";
import { RandomIcon } from "@/icon";
import { Song } from "@/interface";
import formatDate from "@/utils/formatDate";
import formatNumber from "@/utils/formatNumber";
import { Skeleton } from "antd";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BsPauseFill, BsPlayCircle, BsPlayFill } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

function AlbumSingerPage() {
	const pathName = usePathname();
	const nameSinger = pathName.split("/album")[1].split("/")[1];
	const [isLoading, setIsLoading] = useState(false);
	const [listSong, setListSong] = useState<Song[]>([]);
	const [listSinger, setListSinger] = useState<Song[]>([]);
	const [first, setFirst] = useState(false);
	const { handleSetListSong, handleSetNewActiveSong, handleSetPlaying, isPlayingSong, songActive } = usePlayer();
	const Icon = isPlayingSong && first ? BsPauseFill : BsPlayFill;

	let checkPopuLar = popularAlbum.find((item) => item.link === pathName);

	const album = checkPopuLar === undefined ? hotAlbum.find((item) => item.link === pathName) : checkPopuLar;

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

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			let res;
			if (checkPopuLar !== undefined) {
				res = await axios.get(`${apiUrl}/music/get-singer-name`, {
					params: {
						_singer: nameSinger,
					},
				});
				setListSong(res?.data.data);
				setListSinger([res.data.data[res.data.data.length - 2]]);
			} else {
				res = await axios.get(`${apiUrl}/music/top-views`, {
					params: {
						_limit: 300,
					},
				});

				const listSongHotAlbum: Song[] = res.data.data.filter((item: Song) => {
					if (item.slug_category === pathName.split("/album/")[1]) {
						return item;
					}
				});

				setListSong(listSongHotAlbum.reverse().slice(0, 29));
				let list: {
					singer: string;
					song: Song;
				}[] = [];

				listSongHotAlbum
					.reverse()
					.slice(0, 29)
					.map((item: Song) => {
						if (!checkValueInArray(item.name_singer, list)) {
							list.push({
								singer: item.name_singer,
								song: item,
							});
						}
					});

				setListSinger([...list.map((item) => item.song)].reverse().slice(0, 5));
			}

			setIsLoading(false);
		};

		fetchData();
	}, []);
	useEffect(() => {
		document.getElementById(songActive._id)?.scrollIntoView({
			behavior: "smooth",
			block: "center",
			inline: "center",
		});
	}, [songActive._id]);

	const handlePlay = () => {
		handleSetListSong(listSong);
		setFirst(true);
	};

	return (
		<>
			<Navbar />
			<NavbarMobile />
			<div className="text-[var(--text-primary)] px-[10px] md:pl-[100px] xl:pl-[300px] md:px-[30px] xl:px-[60px] pb-[80px] md:pb-[120px]">
				<div className="mt-[100px] px-[10px] flex flex-col lg:flex-row lg:gap-x-8">
					<div className="flex flex-col background-album pt-[30px] pb-[20px] md:flex-row md:gap-x-6 lg:flex-col lg:w-max ">
						<div
							className="relative w-max m-auto md:m-0 group overflow-hidden rounded-lg shadow cursor-pointer"
							onClick={() => {
								handleSetListSong(listSong);
								if (!first) {
									handleSetNewActiveSong(listSong[Math.floor(Math.random() * listSong.length)]);
									setFirst(true);
									handleSetPlaying(true);
								} else {
									handleSetPlaying(!isPlayingSong);
								}
							}}>
							<img
								src={album?.thumbnail}
								className={twMerge(
									`w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] object-cover group-hover:scale-110 group-hover:brightness-[70%] transition-all duration-500 rounded-lg lg:w-[300px] lg:h-[300px]`,
									first && isPlayingSong && `brightness-[70%] scale-110`
								)}
								alt=""
							/>
							<BsPlayCircle
								className={twMerge(
									`w-10 h-10 text-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] hidden group-hover:block`,
									first && isPlayingSong && `group-hover:hidden`
								)}
							/>
							<MusicWaves
								className={twMerge(
									`w-10 h-10 text-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10 invisible`,
									first && isPlayingSong ? `visible` : `invisible`
								)}
							/>
						</div>
						<div className="flex flex-col gap-y-2 items-center mt-4 md:items-start lg:items-center">
							<p className="font-bold text-xl lg:max-w-[300px] text-center">{album?.title}</p>
							<span className="text-xs md:text-sm">{album?.singer}</span>
							{listSong.length > 0 ? (
								<div className="text-xs md:text-sm text-[var(--text-secondary)]">
									Cập nhật • <span>{formatDate(listSong[listSong.length - 1].createdAt)}</span>
								</div>
							) : (
								<div className="w-[150px] h-[10px] bg-gray-700/20 rounded-full"></div>
							)}
							{listSong.length > 0 ? (
								<span className="text-xs md:text-sm text-[var(--text-secondary)]">{formatNumber(listSong[listSong.length - 1].favorite)} quan tâm</span>
							) : (
								<div className="w-[100px] h-[10px] bg-gray-700/20 rounded-full"></div>
							)}

							<button
								className="flex items-center m-auto mt-6 bg-[var(--purple-primary)] px-6 py-2 rounded-full text-white group hover:bg-white border-none outline-none origin-center transition-all duration-300 hover:ring-2 md:m-0 md:mt-6"
								onClick={() => {
									handleSetListSong(listSong);
									if (!first) {
										handleSetNewActiveSong(listSong[Math.floor(Math.random() * listSong.length)]);
										setFirst(true);
										handleSetPlaying(true);
									} else {
										handleSetPlaying(!isPlayingSong);
									}
								}}>
								<Icon className="w-6 h-6 text-white group-hover:text-[var(--purple-primary)]" />
								<span className="uppercase text-sm group-hover:text-[var(--purple-primary)]">{!first ? "Phát ngẫu nhiên" : isPlayingSong ? "Tạm dừng" : "Tiếp tục phát"}</span>
							</button>
						</div>
					</div>
					<div className="mt-5 gap-x-2 lg:flex-1 lg:max-h-[70vh] overflow-y-scroll album-scroll overflow-hidden">
						<div className="flex justify-between items-center px-[20px] text-[var(--text-secondary)] py-[10px]">
							<h3>BÀI HÁT</h3>
							<h3>THỜI GIAN</h3>
						</div>
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
						{listSong.map((item, index) => {
							return !isLoading ? (
								<div key={item._id} id={item._id}>
									<MusicSong song={item} onClick={handlePlay} />
								</div>
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
				<div className="px-[10px] mt-5">
					<h1 className="text-2xl font-bold">Nghệ Sĩ Tham Gia</h1>
					<div className="overflow-x-scroll scroll-artist flex w-full flex-col gap-y-2 mt-6">
						<div className="flex w-full">
							{listSong.length === 0 &&
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
										<div key={item._id} className={twMerge(`w-[50%] flex-shrink-0 px-[10px] sm:px-[12px] md:px[16px] sm:w-[33.3%] lg:w-[25%] xl:w-[20%]`)}>
											<Link href={`/${item.slug_name_singer}`}>
												<div className="relative ">
													<div className="overflow-hidden rounded-full h-0 pb-[100%]">
														<img src={item.image_music} className="rounded-full hover:scale-125 transition-all duration-500 cursor-pointer w-full overflow-hidden" alt="" />
													</div>
												</div>
											</Link>
										</div>
									</>
								);
							})}
						</div>
						<div className="flex w-full">
							{listSinger.map((item, index) => {
								return (
									<>
										<div key={item._id} className={twMerge(`w-[50%] flex-shrink-0 px-[10px] sm:px-[12px] md:px[16px] sm:w-[33.3%] lg:w-[25%] 2xl:w-[20%]`)}>
											<Link href={`/${item.slug_name_singer}`}>
												<p className="text-center pt-2 text-sm md:text-base hover:underline hover:text-[var(--purple-primary)] cursor-pointer line-clamp-1">
													{item.name_singer}
												</p>
												<p className="text-xs mt-2 text-center text-[var(--text-secondary)] pb-8">{formatNumber(listSong[listSong.length - 1].favorite)} quan tâm</p>
											</Link>
										</div>
									</>
								);
							})}
						</div>
					</div>
				</div>
			</div>
			<ThemeModal />
			<FormModal />
		</>
	);
}

export default AlbumSingerPage;
