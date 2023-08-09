"use client";
import SideBar from "./SideBar";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";
import SearchInput from "./SearchInput";
import { IoDiamondOutline } from "react-icons/io5";
import { AiOutlineInfoCircle, AiOutlinePlayCircle, AiOutlineSetting, AiOutlineUpload } from "react-icons/ai";
import { Tooltip } from "antd";
import { VscDesktopDownload } from "react-icons/vsc";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useThemeModal } from "@/hooks/useThemeModal";
import FormModal from "./FormModal";
import { useFormModal } from "@/hooks/useFormModal";
import { useAuth } from "@/context/AuthProvider";
import { Popover } from "antd";
import { BiBlock } from "react-icons/bi";
import { DiBootstrap } from "react-icons/di";
import { FiLogOut, FiPhone } from "react-icons/fi";
import { RiAdvertisementLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function Navbar() {
	const [heightCurrent, setHeightCurrent] = useState(0);
	const themeModal = useThemeModal();
	const formModal = useFormModal();
	const { accessToken, userData, getUserProfile, logout } = useAuth();
	const [isMounted, setIsMounted] = useState(false);
	const router = useRouter();

	const handleScrollScreen = () => {
		setHeightCurrent(window.pageYOffset);
	};

	useEffect(() => {
		if (typeof window !== "undefined") {
			setHeightCurrent(window.pageYOffset);
		}
		getUserProfile(accessToken);
		setIsMounted(true);
		window.addEventListener("scroll", handleScrollScreen, { passive: true });

		return () => window.removeEventListener("scroll", handleScrollScreen);
	}, []);

	if (!isMounted)
		return (
			<div className="hidden md:flex items-start">
				<SideBar />
				<div className={twMerge(`px-[15px] py-[15px] flex justify-between fixed left-[70px] xl:left-[240px] right-0 top-0 z-20 navbar-screen`, heightCurrent > 133 && "isScroll")}>
					<div className="flex items-center gap-x-4">
						<HiOutlineArrowLeft className="w-6 h-6" color="var(--text-primary)" strokeWidth={3} onClick={() => router.back()} />
						<HiOutlineArrowRight className="w-6 h-6" color="var(--text-primary)" strokeWidth={3} onClick={() => router.forward()} />
						<SearchInput />
					</div>
					<div className="flex items-center gap-x-4 xl:gap-x-6">
						<div className="text-[var(--purple-primary)] items-center hidden xl:flex bg-[var(--border-player)] rounded-full py-2 px-4 gap-x-2 cursor-pointer">
							<VscDesktopDownload color="var(--purple-primary)" className="w-5 h-5" />
							<span className="font-bold text-sm">Download</span>
						</div>
						<div className="bg-[var(--border-player)] rounded-full p-3 hover:bg-[var(--hover-blur-bg-button)] cursor-pointer" onClick={() => themeModal.onOpen()}>
							<img src="/images/theme.png" className="w-[20px] aspect-square " alt="" />
						</div>
						<div className="bg-[var(--border-player)] rounded-full p-3 hover:bg-[var(--hover-blur-bg-button)] cursor-pointer">
							<IoDiamondOutline className="w-5 h-5" color="var(--text-primary)" />
						</div>

						<div className="bg-[var(--border-player)] rounded-full p-3 hover:bg-[var(--hover-blur-bg-button)] cursor-pointer">
							<AiOutlineSetting className="w-5 h-5" color="var(--text-primary)" />
						</div>
						<button className="bg-[var(--purple-primary)] text-white px-3 py-2 text-sm rounded-full font-bold xl:px-4" onClick={() => formModal.onOpen()}>
							Đăng nhập
						</button>
					</div>
				</div>
			</div>
		);

	return (
		<>
			<div className="hidden md:flex items-start">
				<SideBar />
				<div className={twMerge(`px-[15px] py-[15px] flex justify-between fixed left-[70px] xl:left-[240px] right-0 top-0 z-20 navbar-screen`, heightCurrent > 133 && "isScroll")}>
					<div className="flex items-center gap-x-4">
						<HiOutlineArrowLeft className="w-6 h-6" color="var(--text-primary)" strokeWidth={3} onClick={() => router.back()} />
						<HiOutlineArrowRight className="w-6 h-6" color="var(--text-primary)" strokeWidth={3} onClick={() => router.forward()} />
						<SearchInput />
					</div>
					<div className="flex items-center gap-x-4 xl:gap-x-6">
						<Tooltip title="Download" color="#7c7c7c">
							<div className="text-[var(--purple-primary)] items-center hidden xl:flex bg-[var(--border-player)] rounded-full py-2 px-4 gap-x-2 cursor-pointer">
								<VscDesktopDownload color="var(--purple-primary)" className="w-5 h-5" />
								<span className="font-bold text-sm">Download</span>
							</div>
						</Tooltip>
						<Tooltip title="Chủ đề" color="#7c7c7c">
							<div className="bg-[var(--border-player)] rounded-full p-3 hover:bg-[var(--hover-blur-bg-button)] cursor-pointer" onClick={() => themeModal.onOpen()}>
								<img src="/images/theme.png" className="w-[20px] aspect-square " alt="" />
							</div>
						</Tooltip>
						<Tooltip title="Nâng cấp VIP" color="#7c7c7c">
							<div className="bg-[var(--border-player)] rounded-full p-3 hover:bg-[var(--hover-blur-bg-button)] cursor-pointer">
								<IoDiamondOutline className="w-5 h-5" color="var(--text-primary)" />
							</div>
						</Tooltip>

						<Popover
							color="var(--primary-bg)"
							trigger="click"
							placement="bottomRight"
							content={
								<div className="flex flex-col p-3 gap-y-2 text-base">
									<div className="flex items-center gap-x-2 hover:bg-[var(--hover-blur-bg-button)] p-2 rounded-md text-[var(--text-primary)] cursor-pointer">
										<BiBlock className="w-5 h-5" />
										<span>Danh sách chặn</span>
									</div>
									<div className="flex items-center gap-x-2 hover:bg-[var(--hover-blur-bg-button)] p-2 rounded-md text-[var(--text-primary)] cursor-pointer">
										<DiBootstrap className="w-5 h-5" />
										<span>Chất lượng nhạc</span>
									</div>
									<div className="flex items-center gap-x-2 hover:bg-[var(--hover-blur-bg-button)] p-2 rounded-md text-[var(--text-primary)] cursor-pointer">
										<AiOutlinePlayCircle className="w-5 h-5" />
										<span>Giao diện</span>
									</div>
									<span className="w-full h-[1px] bg-black"></span>
									<div className="flex items-center gap-x-2 hover:bg-[var(--hover-blur-bg-button)] p-2 rounded-md text-[var(--text-blur)] hover:text-[var(--text-primary)] cursor-pointer">
										<AiOutlineInfoCircle className="w-5 h-5" />
										<span>Giới thiệu</span>
									</div>
									<div className="flex items-center gap-x-2 hover:bg-[var(--hover-blur-bg-button)] p-2 rounded-md text-[var(--text-blur)] hover:text-[var(--text-primary)] cursor-pointer">
										<FiPhone className="w-5 h-5" />
										<span>Liên hệ</span>
									</div>
									<div className="flex items-center gap-x-2 hover:bg-[var(--hover-blur-bg-button)] p-2 rounded-md text-[var(--text-blur)] hover:text-[var(--text-primary)] cursor-pointer">
										<RiAdvertisementLine className="w-5 h-5" />
										<span>Quảng cáo</span>
									</div>
								</div>
							}>
							<div className="bg-[var(--border-player)] rounded-full p-3 hover:bg-[var(--hover-blur-bg-button)] cursor-pointer">
								<AiOutlineSetting className="w-5 h-5" color="var(--text-primary)" />
							</div>
						</Popover>
						{accessToken !== "" ? (
							<Popover
								color="var(--primary-bg)"
								trigger="click"
								placement="bottomRight"
								content={
									<div className="flex flex-col p-3 gap-y-2 text-base">
										<div className="flex items-center gap-x-2 hover:bg-[var(--hover-blur-bg-button)] p-2 rounded-md text-[var(--text-primary)]">
											<IoDiamondOutline className="w-5 h-5" />
											<span>Nâng cấp VIP</span>
										</div>
										<div className="flex items-center gap-x-2 hover:bg-[var(--hover-blur-bg-button)] p-2 rounded-md text-[var(--text-primary)]">
											<IoDiamondOutline className="w-5 h-5" />
											<span>Mua code VIP</span>
										</div>
										<div className="flex items-center gap-x-2 hover:bg-[var(--hover-blur-bg-button)] p-2 rounded-md text-[var(--text-primary)]">
											<AiOutlineUpload className="w-5 h-5" />
											<span>Tải nhạc lên</span>
										</div>
										<span className="w-full h-[1px] bg-black"></span>
										<div
											className="flex items-center gap-x-2 hover:bg-[var(--hover-blur-bg-button)] p-2 rounded-md text-[var(--text-primary)]"
											onClick={() => {
												logout();
												toast.success("Đăng xuất thành công");
											}}>
											<FiLogOut className="w-5 h-5" />
											<span>Đăng xuất</span>
										</div>
									</div>
								}>
								<img src={accessToken !== "" ? userData.image : "/images/default-user.png"} alt="fail" className="w-[40px] h-[40px] cursor-pointer" />
							</Popover>
						) : (
							<button className="bg-[var(--purple-primary)] text-white px-3 py-2 text-sm rounded-full font-bold xl:px-4" onClick={() => formModal.onOpen()}>
								Đăng nhập
							</button>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

export default Navbar;
