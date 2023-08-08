"use client";
import { MusicIcon, RadioIcon, RadioMusicIcon } from "@/icon";
import Link from "next/link";
import { FiMusic } from "react-icons/fi";
import { CiStar } from "react-icons/ci";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { useEffect, useState } from "react";

function SideBar() {
	const pathName = usePathname();
	const [extend, setExtend] = useState(false);

	return (
		<div
			className={twMerge(
				`w-[70px] bg-[var(--sidebar-bg)] h-[100vh] fixed flex flex-col justify-between bottom-0 left-0 items-center transition-all duration-500 z-30 xl:w-[240px]`,
				extend && `w-[240px] items-start bg-[var(--sidebar-popup-bg)]`
			)}>
			<div className="w-full">
				{!extend ? (
					<img src="/images/logo-mini.png" className="m-auto my-3 xl:hidden bg-transparen w-[45px]" alt="" />
				) : (
					<img src="/images/logo.png" className="w-[120px] h-[40px] m-auto mt-6" />
				)}
				<img src="/images/logo.png" className="w-[120px] h-[40px] m-auto mt-6 hidden xl:block" />
				<div className={twMerge(`flex flex-col items-center w-full box-border xl:mt-4`)}>
					<Link
						href="/profile"
						className={twMerge(
							`h-[48px] flex items-center w-full justify-center gap-x-2 transition-all duration-500 xl:justify-start xl:px-[25px] xl:py-[10px] group`,
							pathName === "/profile" && `border-l-2 bg-[var(--border-player)] border-[var(--purple-primary)]`,
							extend && `justify-start p-[20px]`
						)}>
						<MusicIcon
							className={twMerge(`text-white group-hover:text-[var(--purple-primary)]`, extend && `text-[var(--text-primary)]`, pathName === "/profile" && `text-[var(--text-primary)]`)}
						/>
						<p
							className={twMerge(
								`text-[var(--text-primary)] xl:text-white  text-sm font-bold hidden flex-shrink-0 xl:block group-hover:text-[var(--purple-primary)]`,
								pathName === "/profile" && `xl:text-[var(--text-primary)]`,
								extend && `block`
							)}>
							Cá nhân
						</p>
					</Link>
					<Link
						href="/"
						className={twMerge(
							`h-[48px] flex items-center w-full justify-center gap-x-2 transition-all duration-500 xl:justify-start xl:px-[25px] xl:py-[10px] group`,
							pathName === "/" && `border-l-2 bg-[var(--border-player)] border-[var(--purple-primary)] !text-2xl`,
							extend && `justify-start p-[20px]`
						)}>
						<RadioIcon
							className={twMerge(`text-white group-hover:text-[var(--purple-primary)]`, extend && `text-[var(--text-primary)]`, pathName === "/" && `text-[var(--text-primary)]`)}
						/>
						<p
							className={twMerge(
								`text-[var(--text-primary)] xl:text-white text-sm font-bold hidden flex-shrink-0 xl:block group-hover:text-[var(--purple-primary)]`,
								pathName === "/" && `xl:text-[var(--text-primary)]`,
								extend && `block`
							)}>
							Khám phá
						</p>
					</Link>
					<Link
						href="/radio"
						className={twMerge(
							`h-[48px] flex items-center w-full justify-center gap-x-2 transition-all duration-500 xl:justify-start xl:px-[25px] xl:py-[10px] group`,
							pathName === "/radio" && `border-l-2 bg-[var(--border-player)] border-[var(--purple-primary)]`,
							extend && `justify-start p-[20px]`
						)}>
						<RadioMusicIcon
							className={twMerge(`text-white group-hover:text-[var(--purple-primary)]`, extend && `text-[var(--text-primary)]`, pathName === "/radio" && `text-[var(--text-primary)]`)}
						/>
						<p
							className={twMerge(
								`text-[var(--text-primary)] xl:text-white text-sm font-bold hidden flex-shrink-0 xl:block group-hover:text-[var(--purple-primary)]`,
								pathName === "/radio" && `xl:text-[var(--text-primary)]`,
								extend && `block`
							)}>
							Radio
						</p>
					</Link>
					<Link
						href="/new-songs"
						className={twMerge(
							`h-[48px] flex items-center w-full justify-center gap-x-2 transition-all duration-500 xl:justify-start xl:px-[25px] xl:py-[10px] group`,
							pathName === "/new-songs" && `border-l-2 bg-[var(--border-player)] border-[var(--purple-primary)]`,
							extend && `justify-start p-[20px]`
						)}>
						<FiMusic
							className={twMerge(`text-white group-hover:text-[var(--purple-primary)]`, extend && `text-[var(--text-primary)]`)}
							color={pathName === "/new-songs" ? "text-[var(--text-primary)]" : ""}
						/>
						<p
							className={twMerge(
								`text-[var(--text-primary)] xl:text-white text-sm font-bold hidden flex-shrink-0 xl:block group-hover:text-[var(--purple-primary)]`,
								pathName === "/new-songs" && `xl:text-[var(--text-primary)]`,
								extend && `block`
							)}>
							Nhạc mới
						</p>
					</Link>
					<Link
						href="/top-100-song"
						className={twMerge(
							`h-[48px] flex items-center w-full justify-center gap-x-2 transition-all duration-500 xl:justify-start xl:px-[25px] xl:py-[10px] group`,
							pathName === "/top-100-song" && `border-l-2 bg-[var(--border-player)] border-[var(--purple-primary)]`,
							extend && `justify-start p-[20px]`
						)}>
						<CiStar
							className={twMerge(`text-white group-hover:text-[var(--purple-primary)]`, extend && `text-[var(--text-primary)]`)}
							color={pathName === "/top-100-song" ? "text-[var(--text-primary)]" : ""}
							size={20}
						/>
						<p
							className={twMerge(
								`text-[var(--text-primary)] xl:text-white text-sm font-bold hidden flex-shrink-0 xl:block group-hover:text-[var(--purple-primary)]`,
								pathName === "/top-100-song" && `xl:text-[var(--text-primary)]`,
								extend && `block`
							)}>
							Top 100
						</p>
					</Link>
				</div>
			</div>
			<div className={twMerge(`bg-[#ffffff1a] rounded-full hover:bg-[var(--hover-blur-bg-button)] p-2 mb-6 xl:hidden shadow-xl`, extend && `ml-auto mr-4`)} onClick={() => setExtend(!extend)}>
				{!extend ? <AiOutlineRight color="var(--text-primary)" className="w-6 h-6 cursor-pointer" /> : <AiOutlineLeft color="var(--text-primary)" className="w-6 h-6 cursor-pointer " />}
			</div>
		</div>
	);
}

export default SideBar;
