"use client";
import { MusicIcon, RadioIcon, RadioMusicIcon } from "@/icon";
import Link from "next/link";
import { FiMusic } from "react-icons/fi";
import { CiStar } from "react-icons/ci";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { useState } from "react";

function SideBar() {
	const pathName = usePathname();
	const [extend, setExtend] = useState(false);

	return (
		<div
			className={twMerge(
				`w-[70px] bg-[#231c2e] h-[100vh] fixed flex flex-col justify-between bottom-0 left-0 items-center transition-all duration-500 z-30 lg:w-[240px]`,
				extend && `w-[240px] items-start bg-[#2a223a]`
			)}>
			<div className="w-full">
				{!extend ? (
					<img src="https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.9.24/static/media/icon_zing_mp3_60.f6b51045.svg" className="m-auto my-3 lg:hidden" alt="" />
				) : (
					<img src="https://static-zmp3.zmdcdn.me/skins/zmp3-mobile-v5.2/images/logo-mp-3.svg" className="w-[120px] h-[40px] m-auto mt-6" />
				)}
				<img src="https://static-zmp3.zmdcdn.me/skins/zmp3-mobile-v5.2/images/logo-mp-3.svg" className="w-[120px] h-[40px] m-auto mt-6 hidden lg:block" />
				<div className={twMerge(`flex flex-col items-center w-full box-border lg:mt-4`)}>
					<Link
						href="/profile"
						className={twMerge(
							`h-[48px] flex items-center w-full justify-center border-l-2 border-[#393242] gap-x-2 transition-all duration-500 lg:justify-start lg:px-[25px] lg:py-[10px] group`,
							pathName === "/profile" && `bg-[#393242] border-[#9b4de0]`,
							extend && `justify-start p-[20px]`
						)}>
						<MusicIcon className="text-white group-hover:text-[#9b4de0]" />
						<p className={twMerge(`text-white text-sm font-bold hidden flex-shrink-0 lg:block group-hover:text-[#9b4de0]`, extend && `block`)}>Cá nhân</p>
					</Link>
					<Link
						href="/"
						className={twMerge(
							`h-[48px] flex items-center w-full justify-center border-l-2 border-[#393242] gap-x-2 transition-all duration-500 lg:justify-start lg:px-[25px] lg:py-[10px] group`,
							pathName === "/" && `bg-[#393242] border-[#9b4de0]`,
							extend && `justify-start p-[20px]`
						)}>
						<RadioIcon className="text-white group-hover:text-[#9b4de0]" />
						<p className={twMerge(`text-white text-sm font-bold hidden flex-shrink-0 lg:block group-hover:text-[#9b4de0]`, extend && `block`)}>Khám phá</p>
					</Link>
					<Link
						href="/radio"
						className={twMerge(
							`h-[48px] flex items-center w-full justify-center border-l-2 border-[#393242] gap-x-2 transition-all duration-500 lg:justify-start lg:px-[25px] lg:py-[10px] group`,
							pathName === "/radio" && `bg-[#393242] border-[#9b4de0]`,
							extend && `justify-start p-[20px]`
						)}>
						<RadioMusicIcon className="text-white group-hover:text-[#9b4de0]" />
						<p className={twMerge(`text-white text-sm font-bold hidden flex-shrink-0 lg:block group-hover:text-[#9b4de0]`, extend && `block`)}>Radio</p>
					</Link>
					<Link
						href="/new-songs"
						className={twMerge(
							`h-[48px] flex items-center w-full justify-center border-l-2 border-[#393242] gap-x-2 transition-all duration-500 lg:justify-start lg:px-[25px] lg:py-[10px] group`,
							pathName === "/new-songs" && `bg-[#393242] border-[#9b4de0]`,
							extend && `justify-start p-[20px]`
						)}>
						<FiMusic className="text-white group-hover:text-[#9b4de0]" />
						<p className={twMerge(`text-white text-sm font-bold hidden flex-shrink-0 lg:block group-hover:text-[#9b4de0]`, extend && `block`)}>Nhạc mới</p>
					</Link>
					<Link
						href="/top-100-song"
						className={twMerge(
							`h-[48px] flex items-center w-full justify-center border-l-2 border-[#393242] gap-x-2 transition-all duration-500 lg:justify-start lg:px-[25px] lg:py-[10px] group`,
							pathName === "/top-100-song" && `bg-[#393242] border-[#9b4de0]`,
							extend && `justify-start p-[20px]`
						)}>
						<CiStar className="text-white w-6 h-6 group-hover:text-[#9b4de0]" />
						<p className={twMerge(`text-white text-sm font-bold hidden flex-shrink-0 lg:block group-hover:text-[#9b4de0]`, extend && `block`)}>Top 100</p>
					</Link>
				</div>
			</div>
			<div className={twMerge(`bg-[#ffffff1a] rounded-full hover:bg-black p-2 mb-6 lg:hidden`, extend && `ml-auto mr-4`)} onClick={() => setExtend(!extend)}>
				{!extend ? <AiOutlineRight color="white" className="w-6 h-6 cursor-pointer" /> : <AiOutlineLeft color="white" className="w-6 h-6 cursor-pointer " />}
			</div>
		</div>
	);
}

export default SideBar;
