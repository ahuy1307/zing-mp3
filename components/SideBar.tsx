"use client";
import { MusicIcon, RadioIcon, RadioMusicIcon } from "@/icon";
import Link from "next/link";
import { FiMusic } from "react-icons/fi";
import { CiStar } from "react-icons/ci";
import { usePathname, useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { useState } from "react";
import { useAuth } from "@/context/AuthProvider";
import { useFormModal } from "@/hooks/useFormModal";

function SideBar() {
	const pathName = usePathname();
	const [extend, setExtend] = useState(false);
	const formModal = useFormModal();
	const router = useRouter();
	const { accessToken } = useAuth();

	const handleChangePage = (url: string) => {
		if (accessToken === "") {
			formModal.onOpen();
			return;
		}
		router.push(url);
	};

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
					<abbr title="Cá nhân" className="w-full">
						<div
							onClick={() => handleChangePage("/profile")}
							className={twMerge(
								`h-[48px] flex items-center w-full justify-center gap-x-2 transition-all duration-500 xl:justify-start xl:px-[25px] xl:py-[10px] group cursor-pointer`,
								pathName === "/profile" && `border-l-2 bg-[var(--border-player)] border-[var(--purple-primary)]`,
								extend && `justify-start p-[20px]`
							)}>
							<MusicIcon
								className={twMerge(
									`text-white group-hover:text-[var(--purple-primary)]`,
									extend && `text-[var(--text-primary)]`,
									pathName === "/profile" && `text-[var(--text-primary)]`
								)}
							/>
							<p
								className={twMerge(
									`text-[var(--text-primary)] xl:text-white  text-sm font-bold hidden flex-shrink-0 xl:block group-hover:text-[var(--purple-primary)]`,
									pathName === "/profile" && `xl:text-[var(--text-primary)]`,
									extend && `block`
								)}>
								Cá nhân
							</p>
						</div>
					</abbr>
					<abbr title="Khám phá" className="w-full">
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
					</abbr>
					<abbr title="Nhạc mới" className="w-full">
						<Link
							href="/new-songs"
							className={twMerge(
								`h-[48px] flex items-center w-full justify-center gap-x-2 transition-all duration-500 xl:justify-start xl:px-[25px] xl:py-[10px] group`,
								pathName === "/new-songs" && `border-l-2 bg-[var(--border-player)] border-[var(--purple-primary)]`,
								extend && `justify-start p-[20px]`
							)}>
							<FiMusic
								className={twMerge(
									`text-white group-hover:text-[var(--purple-primary)]`,
									extend && `text-[var(--text-primary)]`,
									pathName === "/new-songs" && "text-[var(--text-primary)]"
								)}
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
					</abbr>
					<abbr title="Top 100" className="w-full">
						<Link
							href="/top-100"
							className={twMerge(
								`h-[48px] flex items-center w-full justify-center gap-x-2 transition-all duration-500 xl:justify-start xl:px-[25px] xl:py-[10px] group`,
								pathName === "/top-100" && `border-l-2 bg-[var(--border-player)] border-[var(--purple-primary)]`,
								extend && `justify-start p-[20px]`
							)}>
							<CiStar
								className={twMerge(
									`text-white group-hover:text-[var(--purple-primary)]`,
									extend && `text-[var(--text-primary)]`,
									pathName === "/top-100" && "text-[var(--text-primary)]"
								)}
								size={20}
							/>
							<p
								className={twMerge(
									`text-[var(--text-primary)] xl:text-white text-sm font-bold hidden flex-shrink-0 xl:block group-hover:text-[var(--purple-primary)]`,
									pathName === "/top-100" && `xl:text-[var(--text-primary)]`,
									extend && `block`
								)}>
								Top 100
							</p>
						</Link>
					</abbr>
					<abbr title="History" className="w-full">
						<div
							onClick={() => handleChangePage("/history")}
							className={twMerge(
								`h-[48px] flex items-center w-full justify-center gap-x-2 transition-all duration-500 xl:justify-start xl:px-[25px] xl:py-[10px] group cursor-pointer`,
								pathName === "/history" && `border-l-2 bg-[var(--border-player)] border-[var(--purple-primary)]`,
								extend && `justify-start p-[20px]`
							)}>
							<RadioMusicIcon
								className={twMerge(
									`text-white group-hover:text-[var(--purple-primary)]`,
									extend && `text-[var(--text-primary)]`,
									pathName === "/history" && `text-[var(--text-primary)]`
								)}
							/>
							<p
								className={twMerge(
									`text-[var(--text-primary)] xl:text-white text-sm font-bold hidden flex-shrink-0 xl:block group-hover:text-[var(--purple-primary)]`,
									pathName === "/history" && `xl:text-[var(--text-primary)]`,
									extend && `block`
								)}>
								History
							</p>
						</div>
					</abbr>
				</div>
			</div>
			<div className={twMerge(`bg-[#ffffff1a] rounded-full hover:bg-[var(--hover-blur-bg-button)] p-2 mb-6 xl:hidden shadow-xl`, extend && `ml-auto mr-4`)} onClick={() => setExtend(!extend)}>
				{!extend ? <AiOutlineRight color="var(--text-primary)" className="w-6 h-6 cursor-pointer" /> : <AiOutlineLeft color="var(--text-primary)" className="w-6 h-6 cursor-pointer " />}
			</div>
		</div>
	);
}

export default SideBar;
