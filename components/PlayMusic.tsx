"use client";
import { usePlayer } from "@/context/PlayProvider";
import { useListMusic } from "@/hooks/useListMusic";
import { MVIcon, OnlyOneSongIcon, RandomIcon } from "@/icon";
import { Song } from "@/interface";
import { formatTime } from "@/utils/fomatTime";
import formatNumber from "@/utils/formatNumber";
import { Tooltip } from "antd";
import { useEffect, useRef, useState } from "react";
import { AiOutlineDownload, AiOutlineEye, AiOutlineHeart } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { BsFillPlayFill, BsMusicNoteList, BsPauseFill, BsThreeDots } from "react-icons/bs";
import { HiVolumeOff, HiVolumeUp } from "react-icons/hi";
import { twMerge } from "tailwind-merge";
import FavoriteButton from "./FavoriteButton";
import ListSongPlayer from "./ListSongPlayer";

function PlayMusic() {
	const {
		songActive,
		listSongData,
		handleSetNewActiveSong,
		handleSetPlaying,
		isPlayingSong,
		currentVolume,
		isRandom,
		isRepeat,
		handleSetVolume,
		timeCurrent,
		handleSetTime,
		handleSetNewTime,
		handleSetRepeat,
		handleSetRandom,
		newTime,
	} = usePlayer();
	const [isClient, setIsClient] = useState(false);
	const Icon = isPlayingSong ? BsPauseFill : BsFillPlayFill;
	const { onOpen, onClose, isOpen } = useListMusic();
	const [prevVolume, setPrevVolume] = useState(0);
	const IconVolume = currentVolume !== 0 ? HiVolumeUp : HiVolumeOff;
	const volumeRef: any = useRef(null);
	const timeRef: any = useRef(null);
	const [showOther, setShowOther] = useState(false);

	const [volume, setVolume] = useState(() => {
		return currentVolume * 10;
	});

	const onNextSong = () => {
		if (listSongData.length === 0) return;
		const index = listSongData.findIndex((item) => item._id === songActive._id);
		if (isRandom) {
			let random = Math.floor(Math.random() * listSongData.length);
			while (random === index) {
				random = Math.floor(Math.random() * listSongData.length);
			}
			handleSetNewActiveSong(listSongData[random]);
			handleSetPlaying(true);
			return;
		}

		if (index === listSongData.length - 1) {
			handleSetNewActiveSong(listSongData[0]);
		} else {
			handleSetNewActiveSong(listSongData[index + 1]);
		}
		handleSetTime(0);
		handleSetPlaying(true);
	};

	const onPrevSong = () => {
		if (listSongData.length === 0) return;

		const index = listSongData.findIndex((item) => item._id === songActive._id);
		if (isRandom) {
			let random = Math.floor(Math.random() * listSongData.length);
			while (random === index) {
				random = Math.floor(Math.random() * listSongData.length);
			}
			handleSetNewActiveSong(listSongData[random]);
			handleSetPlaying(true);
			return;
		}

		if (index === 0) {
			handleSetNewActiveSong(listSongData[listSongData.length - 1]);
		} else {
			handleSetNewActiveSong(listSongData[index - 1]);
		}
		handleSetTime(0);
		handleSetPlaying(true);
	};

	const handlePlaying = () => {
		if (!isPlayingSong) {
			handleSetPlaying(true);
		} else {
			handleSetPlaying(false);
		}
	};

	useEffect(() => {
		setIsClient(true);
	}, []);

	useEffect(() => {
		handleSetVolume(volume / 10);
	}, [volume]);

	const setBackgroundSizesVolume = () => {
		return {
			backgroundSize: `${currentVolume * 100}% 100%`,
		};
	};

	const setBackgroundSizesTime = () => {
		return {
			backgroundSize: `${Math.floor((timeCurrent / Number(songActive?.seconds)) * 100)}% 100%`,
		};
	};
	if (!isClient) return null;
	if (!songActive._id) return null;

	return (
		<>
			<div className="fixed h-[70px] bottom-0 left-0 right-0 bg-[var(--player-bg)] text-[var(--text-primary)] z-[99] md:h-[90px] md:px-[20px]">
				<div className="flex items-center gap-x-4 h-full px-[10px]">
					<img src={songActive.image_music} className={twMerge(`w-[40px] h-[40px] md:w-[64px] md:h-[64px] rounded-full md:hidden`, isPlayingSong ? `spin` : `returnSpin`)} alt="" />
					<img src={songActive.image_music} className={twMerge(`hidden md:block w-[64px] h-[64px] rounded-md`)} alt="" />
					<div className="flex flex-col gap-y-1 w-[100px] max-w-[80px] lg:w-auto lg:max-w-none">
						<h3 className="line-clamp-1">{songActive.name_music}</h3>
						<span className="text-[var(--text-secondary)] text-xs line-clamp-1">{songActive.name_singer}</span>
					</div>
					<div className="flex pl-4 gap-x-2 xl:gap-x-4">
						<FavoriteButton id={songActive._id} play={true} />
						<div className="relative hidden lg:block">
							<Tooltip title="Khác" color="black">
								<BsThreeDots color="var(--text-primary)" className="w-8 h-8 md:w-9 md:h-9 ml-auto hover:bg-[var(--border-color)] rounded-full p-1" onClick={() => setShowOther(true)} />
							</Tooltip>
							<div
								className={twMerge(
									`absolute left-0 top-0 translate-y-[-100%] bg-[var(--primary-bg)] w-[240px] flex-col rounded-md py-1 scale-0 transition-all duration-300 origin-bottom text-sm`,
									showOther && `scale-100`
								)}>
								<div className="flex items-center gap-x-2 p-2">
									<img src={songActive.image_music} className="w-[45px] h-[45px] object-cover rounded-md" alt="" />
									<div className="text-[var(--text-primary)]">
										<h1 className="font-bold">{songActive.name_music}</h1>
										<div className="flex items-center gap-x-1 text-[var(--text-secondary)] text-xs pt-[2px]">
											<AiOutlineHeart />
											<span>{formatNumber(songActive.favorite, 0)}</span>
											<AiOutlineEye />
											<span>{formatNumber(songActive.view, 0)}</span>
										</div>
									</div>
								</div>
								<div className="flex items-center gap-x-2 py-4 px-2 border-t border-[var(--text-primary)] text-[var(--text-primary)] w-full justify-center font-semibold">
									<AiOutlineDownload className="w-5 h-5" />
									<span>Download</span>
								</div>
							</div>
						</div>
					</div>
					<div className="px-[30px] lg:pl-8 flex flex-col justify-center w-full lg:max-w-[600px] xl:max-w-[800px]">
						<div className="flex gap-x-2 items-center md:gap-x-4 justify-center md:pb-2">
							<Tooltip title={isRandom ? `Tắt phát ngẫu nhiên` : `Bật phát ngẫu nhiên`} color="black">
								<div className="w-[24px] hidden md:block hover:bg-[var(--border-player)] rounded-full h-full cursor-pointer" onClick={() => handleSetRandom(!isRandom)}>
									<RandomIcon className={twMerge(`hidden md:block text-[var(--text-primary)]`, isRandom && `text-[var(--purple-primary)]`)} />
								</div>
							</Tooltip>
							<div className="hover:bg-[var(--border-player)] rounded-full w-max h-full cursor-pointer" onClick={onPrevSong}>
								<BiSkipPrevious className="w-10 h-10" />
							</div>
							<div
								className="w-max h-full md:border-2 border-[var(--text-primary)] rounded-full p-[2px] hover:border-[var(--purple-primary)] cursor-pointer group"
								onClick={handlePlaying}>
								<Icon className="w-8 h-8 md:relative group-hover:text-[var(--purple-primary)]" />
							</div>
							<div className="hover:bg-[var(--border-player)] rounded-full w-max h-full cursor-pointer" onClick={onNextSong}>
								<BiSkipNext className="w-10 h-10 " />
							</div>
							<Tooltip title={isRepeat ? `Tắt phát lại` : `Bật phát lại`} color="black">
								<div className="w-[20px] hidden md:block hover:bg-[var(--border-player)] rounded-full h-full cursor-pointer" onClick={() => handleSetRepeat(!isRepeat)}>
									<OnlyOneSongIcon className={twMerge(``, isRepeat && `text-[var(--purple-primary)]`)} />
								</div>
							</Tooltip>
						</div>

						<div className="w-full hidden md:flex md:gap-x-2 slider-time md:items-center md:justify-start pb-3">
							<span className="font-semibold text-xs">{formatTime(timeCurrent)}</span>
							<input
								type="range"
								value={Math.floor((timeCurrent * 100) / Number(songActive.seconds))}
								min={0}
								max={100}
								step={1}
								name=""
								id=""
								style={setBackgroundSizesTime()}
								className="input-time"
								ref={timeRef}
								onInput={(e: any) => {
									if (isPlayingSong) {
										handleSetNewTime((Number(e.target.value) * Number(songActive.seconds)) / 100);
										handleSetTime((Number(e.target.value) * Number(songActive.seconds)) / 100);
									} else {
										handleSetTime((Number(e.target.value) * Number(songActive.seconds)) / 100);
									}
								}}
							/>
							<span className="font-semibold text-xs">{songActive.time_format}</span>
						</div>
					</div>
					<div className="gap-x-2 items-center hidden md:flex ml-auto xl:gap-x-4">
						<div className="hover:bg-[var(--border-player)] rounded-full w-max h-full cursor-pointer p-1">
							<MVIcon className="relative top-[-2px]" />
						</div>
						<div className="hover:bg-[var(--border-player)] rounded-full w-max h-full cursor-pointer p-2 relative group">
							<IconVolume
								className="w-6 h-6"
								onClick={() => {
									if (volume !== 0) {
										setPrevVolume(volume);
										setVolume(0);
									} else {
										if (prevVolume === 0) {
											setVolume(1);
										} else {
											setVolume(prevVolume);
										}
									}
								}}
							/>
							<div className="absolute w-[150px] h-[30px] bg-transparent top-[-50%] left-0 translate-x-[-50%] hidden group-hover:block xl:hidden"></div>
							<div className="bg-[#353535] py-1 px-2 rounded-md min-w-[140px] h-[28px] items-center absolute top-[-100%] translate-x-[-50%] hidden group-hover:block xl:group-hover:hidden">
								<input
									style={setBackgroundSizesVolume()}
									type="range"
									value={volume}
									min={0}
									max={10}
									ref={volumeRef}
									className={twMerge(`input-volume`)}
									onInput={(e: any) => setVolume(Number(e.target.value))}
								/>
							</div>
						</div>
						<input
							style={setBackgroundSizesVolume()}
							type="range"
							value={volume}
							min={0}
							max={10}
							ref={volumeRef}
							className={twMerge(`input-volume hidden xl:block`)}
							onInput={(e: any) => setVolume(Number(e.target.value))}
						/>
					</div>
					<div className="ml-auto">
						<div
							className={twMerge(`bg-[#fff6] p-2 rounded-md cursor-pointer`, isOpen && `bg-[var(--purple-primary)]`)}
							onClick={() => {
								if (isOpen) onClose();
								else onOpen();
							}}>
							<BsMusicNoteList />
						</div>
					</div>
				</div>
			</div>
			<ListSongPlayer />
		</>
	);
}

export default PlayMusic;
