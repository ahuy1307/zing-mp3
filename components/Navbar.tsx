"use client";
import SideBar from "./SideBar";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";
import SearchInput from "./SearchInput";
import { IoDiamondOutline } from "react-icons/io5";
import { AiOutlineSetting } from "react-icons/ai";
import { Tooltip } from "antd";
import { VscDesktopDownload } from "react-icons/vsc";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

function Navbar() {
	const [showNav, setShowNav] = useState(false);
	const [heightCurrent, setHeightCurrent] = useState(0);

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
		<div className="hidden md:flex items-start">
			<SideBar />
			<div className={twMerge(`px-[15px] py-[15px] flex justify-between fixed left-[70px] lg:left-[240px] right-0 top-0 z-20 navbar-screen`, heightCurrent > 133 && "isScroll")}>
				<div className="flex items-center gap-x-4">
					<HiOutlineArrowLeft className="w-6 h-6" color="white" strokeWidth={3} />
					<HiOutlineArrowRight className="w-6 h-6" color="white" strokeWidth={3} />
					<SearchInput />
				</div>
				<div className="flex items-center gap-x-4 xl:gap-x-6">
					<Tooltip title="Download" color="#7c7c7c">
						<div className="text-[#9b4ddf] items-center hidden xl:flex bg-[#ffffff1a] rounded-full py-2 px-4 gap-x-2 cursor-pointer">
							<VscDesktopDownload color="#9b4ddf" className="w-5 h-5" />
							<span className="font-bold text-sm">Download</span>
						</div>
					</Tooltip>
					<Tooltip title="Chủ đề" color="#7c7c7c">
						<div className="bg-[#ffffff1a] rounded-full p-3 hover:bg-black cursor-pointer">
							<img src="/images/theme.png" className="w-[20px] aspect-square " alt="" />
						</div>
					</Tooltip>
					<Tooltip title="Nâng cấp VIP" color="#7c7c7c">
						<div className="bg-[#ffffff1a] rounded-full p-3 hover:bg-black cursor-pointer">
							<IoDiamondOutline className="w-5 h-5" color="white" />
						</div>
					</Tooltip>
					<Tooltip title="Cài đặt" color="#7c7c7c">
						<div className="bg-[#ffffff1a] rounded-full p-3 hover:bg-black cursor-pointer">
							<AiOutlineSetting className="w-5 h-5" color="white" />
						</div>
					</Tooltip>
					<button className="bg-[#9b4ddf] text-white px-3 py-2 text-sm rounded-full font-bold lg:px-4">Đăng nhập</button>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
