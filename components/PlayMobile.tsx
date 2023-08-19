"use client";
import { useAuth } from "@/context/AuthProvider";
import { useHistory } from "@/context/HistoryProvider";
import { usePlayer } from "@/context/PlayProvider";
import { OnlyOneSongIcon, RandomIcon } from "@/icon";
import { formatTime } from "@/utils/fomatTime";
import formatNumber from "@/utils/formatNumber";
import { Tooltip } from "antd";
import { useRef, useState } from "react";
import { AiOutlineDownload, AiOutlineEye, AiOutlineHeart } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { BsFillPlayFill, BsPauseFill, BsThreeDots } from "react-icons/bs";
import { HiOutlineChevronDoubleDown } from "react-icons/hi";
import { twMerge } from "tailwind-merge";
import FavoriteButton from "./FavoriteButton";

function PlayMobile({ className, setShow }: { className?: string; setShow?: React.Dispatch<React.SetStateAction<boolean>> }) {
	const { songActive } = usePlayer();
	const [showOther, setShowOther] = useState(false);
	const { timeCurrent, isPlayingSong, handleSetNewTime, handleSetTime, handleSetRepeat, handleSetRandom, isRandom, isRepeat, listSongData, handleSetNewActiveSong, handleSetPlaying } = usePlayer();
	const { addHistorySong } = useHistory();
	const { accessToken } = useAuth();
	const Icon = isPlayingSong ? BsPauseFill : BsFillPlayFill;

	const setBackgroundSizesTime = () => {
		return {
			backgroundSize: `${Math.floor((timeCurrent / Number(songActive?.seconds)) * 100)}% 100%`,
		};
	};

	const onNextSong = () => {
		if (listSongData.length === 0) return;
		const index = listSongData.findIndex((item) => item._id === songActive._id);
		if (isRandom) {
			let random = Math.floor(Math.random() * listSongData.length);
			while (random === index) {
				random = Math.floor(Math.random() * listSongData.length);
			}
			addHistorySong(accessToken, listSongData[random]._id);
			handleSetNewActiveSong(listSongData[random]);
			handleSetPlaying(true);
			return;
		}

		if (index === listSongData.length - 1) {
			addHistorySong(accessToken, listSongData[0]._id);
			handleSetNewActiveSong(listSongData[0]);
		} else {
			addHistorySong(accessToken, listSongData[index + 1]._id);
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
			addHistorySong(accessToken, listSongData[random]._id);
			handleSetNewActiveSong(listSongData[random]);
			handleSetPlaying(true);
			return;
		}

		if (index === 0) {
			addHistorySong(accessToken, listSongData[listSongData.length - 1]._id);
			handleSetNewActiveSong(listSongData[listSongData.length - 1]);
		} else {
			addHistorySong(accessToken, listSongData[index - 1]._id);
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

	return (
		<div className={twMerge(`fixed inset-0 w-full h-full bg-[var(--primary-bg)] z-[99] translate-y-[100%] transition-all duration-700`, className)}>
			<div
				className="absolute inset-0 bg-white w-full h-full -z-20"
				style={{
					background: `url(${songActive.image_music}) no-repeat center center/cover`,
					filter: `blur(40px)`,
				}}></div>
			<div className="absolute top-6 right-6" onClick={() => setShow?.(false)}>
				<HiOutlineChevronDoubleDown color="white" size={30} strokeWidth={3} />
			</div>

			<div className="flex flex-col gap-y-5 items-center px-[30px] pt-[100px]">
				<div className="aspect-[1/1] rounded-full max-w-[260px] w-[70vw]">
					<img src={songActive.image_music} className={twMerge(`z-[100] w-full h-full rounded-full object-cover`, isPlayingSong ? `spin` : `returnSpin`)} alt="" />
				</div>
				<div className="flex flex-col items-center">
					<h3 className="text-white font-bold">{songActive.name_music}</h3>
					<p className="text-[hsla(0,0%,86%,.769)]">{songActive.name_singer}</p>
					<span className="text-white">{formatNumber(songActive.view, 1)}</span>
				</div>
			</div>
			<div className="flex flex-col gap-y-2 ml-auto z-[20] px-[30px] relative pt-[20px]">
				<FavoriteButton id={songActive._id} play={true} mobile={true} />
				<BsThreeDots
					color="white"
					className="w-8 h-8 md:w-9 md:h-9 ml-auto hover:bg-[var(--border-color)] rounded-full p-1"
					onClick={() => {
						setShowOther(!showOther);
					}}
				/>
				<div
					className={twMerge(
						`absolute right-6 top-12 translate-y-[-100%] bg-[var(--primary-bg)] w-[240px] flex-col rounded-md py-1 transition-all origin-bottom-right duration-300  text-sm z-[30] scale-0`,
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
			<div className="w-full slider-time px-[50px] flex gap-x-2 text-white items-center mt-[30px]">
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
			<div className="flex gap-x-6 items-center mt-[36px] justify-center md:pb-2">
				<Tooltip title={isRandom ? `Tắt phát ngẫu nhiên` : `Bật phát ngẫu nhiên`} color="black">
					<div className="w-[24px] block hover:bg-[var(--border-player)] rounded-full h-full cursor-pointer" onClick={() => handleSetRandom(!isRandom)}>
						<RandomIcon className={twMerge(`block text-white`, isRandom && `text-[var(--purple-primary)]`)} />
					</div>
				</Tooltip>
				<div className="hover:bg-[var(--border-player)] rounded-full w-max h-full cursor-pointer" onClick={onPrevSong}>
					<BiSkipPrevious className="w-10 h-10" color="white" />
				</div>
				<div className="w-max h-full border-2 border-white rounded-full p-[2px] hover:border-[var(--purple-primary)] cursor-pointer group" onClick={handlePlaying}>
					<Icon className={twMerge(`w-8 h-8 relative group-hover:text-[var(--purple-primary)] text-white`, !isPlayingSong && `left-[2px]`)} />
				</div>
				<div className="hover:bg-[var(--border-player)] rounded-full w-max h-full cursor-pointer" onClick={onNextSong}>
					<BiSkipNext className="w-10 h-10" color="white" />
				</div>
				<Tooltip title={isRepeat ? `Tắt phát lại` : `Bật phát lại`} color="black">
					<div className="w-[20px] block hover:bg-[var(--border-player)] rounded-full h-full cursor-pointer" onClick={() => handleSetRepeat(!isRepeat)}>
						<OnlyOneSongIcon className={twMerge(`text-white`, isRepeat && `text-[var(--purple-primary)]`)} />
					</div>
				</Tooltip>
			</div>
		</div>
	);
}

export default PlayMobile;
