"use client";
import { MusicIcon, RadioIcon, RadioMusicIcon } from "@/icon";
import { HiMagnifyingGlass, HiBars3 } from "react-icons/hi2";
import { IoCloseSharp } from "react-icons/io5";
import { PiMusicNotesSimple } from "react-icons/pi";
import { AiOutlineStar } from "react-icons/ai";
import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";
import ThemeModal from "./ThemeModal";
import { useThemeModal } from "@/hooks/useThemeModal";
import { usePathname } from "next/navigation";
import Link from "next/link";

function NavbarMobile() {
	const [showNav, setShowNav] = useState(false);
	const [heightCurrent, setHeightCurrent] = useState(0);
	const { onOpen } = useThemeModal();
	const pathName = usePathname();

	const handleScrollScreen = () => {
		setHeightCurrent(window.pageYOffset);
	};

	useEffect(() => {
		if (typeof window !== "undefined") {
			setHeightCurrent(window.pageYOffset);
		}

		window.addEventListener("scroll", handleScrollScreen, { passive: true });

		return () => window.removeEventListener("scroll", handleScrollScreen);
	}, []);

	return (
		<>
			<div className={twMerge(`flex justify-between items-center navbar-mb px-1 py-2 fixed top-0 right-0 left-0 md:hidden z-10`, heightCurrent > 133 && `isScroll`)}>
				<HiBars3 className="w-6 h-6 cursor-pointer" color="var(--text-primary)" onClick={() => setShowNav(true)} />
				<img src="https://static-zmp3.zmdcdn.me/skins/zmp3-mobile-v5.2/images/logo-mp-3.svg" className="h-[40px] cursor-pointer" alt="" />
				<div className="flex items-center gap-x-2">
					<HiMagnifyingGlass className="w-6 h-6 cursor-pointer mr-2" color="var(--text-primary)" />
					<div className="bg-[var(--border-player)] rounded-full p-2" onClick={() => onOpen()}>
						<img src="/images/theme.png" className="w-[20px] aspect-square cursor-pointer" alt="" />
					</div>
				</div>
				{showNav && <div onClick={() => setShowNav(false)} className="fixed bg-black/40 inset-0 h-[100vh]"></div>}
				<div className={twMerge(`absolute top-0 left-0 max-w-[100vw] w-[80vw] bg-white shadow h-[100vh] translate-x-[-100%] transition-all duration-300`, showNav && `translate-x-[0]`)}>
					<IoCloseSharp className="w-8 h-8 absolute top-2 right-2" color="black" onClick={() => setShowNav(false)} />
					<div className="bg-gray-400/10 flex items-center py-10 gap-x-6 pl-6">
						<img src="/images/default-user.png" className="w-[60px] aspect-square rounded-full" alt="" />
						<button className="bg-[var(--purple-primary)] text-white px-7 py-2 rounded-full font-bold">Đăng nhập</button>
					</div>
					<ul className="flex flex-col  text-black/60 pt-6">
						<li className={twMerge(`hover:text-[var(--purple-primary)] pl-6 py-2`, pathName === "/profile" && `bg-[var(--border-player)] text-[var(--purple-primary)]`)}>
							<Link className="flex items-center gap-x-4" href="/profile">
								<MusicIcon />
								<span className="uppercase">Cá nhân</span>
							</Link>
						</li>
						<li className={twMerge(`hover:text-[var(--purple-primary)] pl-6 py-2`, pathName === "/" && `bg-[var(--border-player)] text-[var(--purple-primary)]`)}>
							<Link className="flex items-center gap-x-4" href="/">
								<RadioIcon />
								<span className="uppercase">Khám phá</span>
							</Link>
						</li>
						<li className={twMerge(`hover:text-[var(--purple-primary)] pl-6 py-2`, pathName === "/radio" && `bg-[var(--border-player)] text-[var(--purple-primary)]`)}>
							<Link className="flex items-center gap-x-4" href="/radio">
								<RadioMusicIcon />
								<span className="uppercase">Radio</span>
							</Link>
						</li>
						<li className={twMerge(`hover:text-[var(--purple-primary)] pl-6 py-2`, pathName === "/new-songs" && `bg-[var(--border-player)] text-[var(--purple-primary)]`)}>
							<Link className="flex items-center gap-x-4" href="/new-songs">
								<PiMusicNotesSimple className="w-5 h-5" />
								<span className="uppercase">Nhạc mới</span>
							</Link>
						</li>
						<li className={twMerge(`hover:text-[var(--purple-primary)] pl-6 py-2`, pathName === "/top-100" && `bg-[var(--border-player)] text-[var(--purple-primary)]`)}>
							<Link className="flex items-center gap-x-4" href="/top-100">
								<AiOutlineStar className="w-5 h-5" />
								<span className="uppercase">Top 100</span>
							</Link>
						</li>
					</ul>
				</div>
			</div>
			<ThemeModal />
		</>
	);
}

export default NavbarMobile;
