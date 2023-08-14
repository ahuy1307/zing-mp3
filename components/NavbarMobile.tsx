"use client";
import { MusicIcon, RadioIcon, RadioMusicIcon } from "@/icon";
import { HiMagnifyingGlass, HiBars3 } from "react-icons/hi2";
import { IoCloseSharp } from "react-icons/io5";
import { PiMusicNotesSimple } from "react-icons/pi";
import { AiOutlineClose, AiOutlineStar } from "react-icons/ai";
import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";
import { useThemeModal } from "@/hooks/useThemeModal";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useFormModal } from "@/hooks/useFormModal";
import { useAuth } from "@/context/AuthProvider";
import toast from "react-hot-toast";
import useDebounce from "@/hooks/useDebounce";
import axios from "axios";
import { apiUrl } from "@/constant";
import { ClipLoader } from "react-spinners";
import SearchItem from "./SearchItem";
import { Song } from "@/interface";
import formatNumber from "@/utils/formatNumber";
import Image from "next/image";

function NavbarMobile() {
	const [showNav, setShowNav] = useState(false);
	const [heightCurrent, setHeightCurrent] = useState(0);
	const themeModal = useThemeModal();
	const formModal = useFormModal();
	const pathName = usePathname();
	const { userData, accessToken, getUserProfile, logout } = useAuth();
	const router = useRouter();
	const [isClient, setIsClient] = useState(false);
	const hasWindow = typeof window !== "undefined";
	const [searchTitle, setSearchTitle] = useState("");
	const [searchResult, setSearchResult] = useState<Song[]>([]);
	const [isSearching, setIsSearching] = useState(false);
	const debounceSearch = useDebounce(searchTitle, 1000);
	const [showSearch, setShowSearch] = useState(false);
	const handleScrollScreen = () => {
		if (hasWindow) setHeightCurrent(window.pageYOffset);
	};

	const handleToProfile = () => {
		if (accessToken === "") {
			setShowNav(false);
			formModal.onOpen();
			return;
		}
		router.push("/profile");
	};
	useEffect(() => {
		if (typeof window !== "undefined") {
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
		setIsClient(true);

		const fetchSearch = async () => {
			if (debounceSearch === "") {
				setSearchResult([]);
				return;
			}

			setIsSearching(true);
			const res = await axios.get(`${apiUrl}/search`, {
				params: {
					query: debounceSearch,
				},
			});
			setSearchResult(res.data.data);
			setIsSearching(false);
		};
		fetchSearch();

		if (hasWindow) {
			setHeightCurrent(window.pageYOffset);
		}

		if (accessToken !== "") getUserProfile(accessToken);

		window.addEventListener("scroll", handleScrollScreen, { passive: true });

		return () => window.removeEventListener("scroll", handleScrollScreen);
	}, [debounceSearch]);

	if (!isClient)
		return (
			<div className={twMerge(`flex justify-between items-center navbar-mb px-1 py-2 fixed top-0 right-0 left-0 md:hidden z-[3]`, heightCurrent > 133 && `isScroll`)}>
				<HiBars3 className="w-6 h-6 cursor-pointer" color="var(--text-primary)" />
				<Link href="/" className="relative w-[120px] h-[40px]">
					<Image src="/images/logo.png" className="h-[40px] aspect-square cursor-pointer" fill alt="" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
				</Link>
				<div className="flex items-center gap-x-2">
					<HiMagnifyingGlass className="w-6 h-6 cursor-pointer mr-2" color="var(--text-primary)" onClick={() => setShowSearch(true)} />
					<div className="bg-[var(--border-player)] rounded-full p-2" onClick={() => themeModal.onOpen()}>
						<img src="/images/theme.png" className="w-[20px] aspect-square cursor-pointer" alt="" />
					</div>
				</div>
			</div>
		);

	return (
		<>
			<div className={twMerge(`flex justify-between items-center navbar-mb px-1 py-2 fixed top-0 right-0 left-0 md:hidden z-[3]`, heightCurrent > 133 && `isScroll`)}>
				<HiBars3
					className="w-6 h-6 cursor-pointer"
					color="var(--text-primary)"
					onClick={() => {
						setShowNav(true);
						setShowSearch(false);
					}}
				/>
				<Link href="/" className="relative w-[120px] h-[40px]">
					<Image src="/images/logo.png" className="h-[40px] aspect-square cursor-pointer" fill alt="" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
				</Link>
				<div className="flex items-center gap-x-2">
					{!showSearch ? (
						<HiMagnifyingGlass className="w-6 h-6 cursor-pointer mr-2" color="var(--text-primary)" onClick={() => setShowSearch(true)} />
					) : (
						<AiOutlineClose
							className="w-6 h-6 cursor-pointer mr-2"
							color="var(--text-primary)"
							onClick={() => {
								setShowSearch(false);
								setSearchTitle("");
							}}
						/>
					)}
					{isClient && (
						<div
							className={twMerge(
								`absolute w-[100vw] h-[70vh] bg-[var(--primary-bg)] top-[56px] translate-y-[calc(-100%-56px)] left-0 p-3 overflow-y-scroll transition-all duration-300 opacity-0`,
								showSearch && `translate-y-0 opacity-100`
							)}>
							{!isSearching && searchTitle !== "" && <AiOutlineClose className="w-5 h-5 absolute top-4 right-5 text-[var(--text-primary)]" onClick={() => setSearchTitle("")} />}
							{isSearching && (
								<ClipLoader
									size={20}
									color="var(--text-primary)"
									cssOverride={{
										position: "absolute",
										top: "12px",
										right: "20px",
									}}
								/>
							)}
							<div className="flex items-center">
								<HiMagnifyingGlass className="w-6 h-6 cursor-pointer mr-2" color="var(--text-primary)" />
								<input
									value={searchTitle}
									type="text"
									placeholder="Tìm kiếm bài hát, nghệ sĩ..."
									className="bg-transparent border-none outline-none placeholder:text-[var(--text-primary)] text-[var(--text-primary)]"
									onChange={(e) => setSearchTitle(e.target.value)}
								/>
							</div>
							<p className="font-bold mt-4 text-sm text-[var(--text-primary)]">{debounceSearch !== "" ? "Kết quả tìm kiếm" : "Nhập thông tin tìm kiếm"}</p>
							{debounceSearch !== "" && searchResult.length === 0 && <h3 className="font-bold text-[var(--text-primary)] text-center mt-6">Không tìm thấy kết quả!</h3>}
							{searchResult.length > 0 && (
								<div className="mt-4">
									<Link
										href={`${searchResult[searchResult.length - 1].slug_name_singer}`}
										className="flex items-center gap-x-2 p-2 hover:bg-[var(--border-player)] rounded-md cursor-pointer text-[var(--text-primary)]">
										<img src={searchResult[searchResult.length - 1].image_music} className="w-[52px] h-[52px] rounded-full object-cover" alt="" />
										<div className="text-sm">
											<p className="font-bold">{searchResult[searchResult.length - 1].name_singer}</p>
											<div className="text-[var(--text-secondary)] flex gap-x-2">
												<span>{searchResult[searchResult.length - 1].category}</span>
												<span>-</span>
												<span>{formatNumber(searchResult[searchResult.length - 1].favorite, 0)} quan tâm</span>
											</div>
										</div>
									</Link>
									{searchResult.map((item: Song) => {
										return <SearchItem song={item} key={item._id} />;
									})}
								</div>
							)}
						</div>
					)}
					<div className="bg-[var(--border-player)] rounded-full p-2" onClick={() => themeModal.onOpen()}>
						<img src="/images/theme.png" className="w-[20px] aspect-square cursor-pointer" alt="" />
					</div>
				</div>
				{showNav && <div onClick={() => setShowNav(false)} className="fixed bg-black/40 inset-0 h-[100vh]"></div>}
				{showSearch && <div onClick={() => setShowSearch(false)} className="fixed bg-black/40 inset-0 top-[56px] -z-10 h-[100vh]"></div>}
				<div className={twMerge(`absolute top-0 left-0 max-w-[100vw] w-[80vw] bg-white shadow h-[100vh] translate-x-[-100%] transition-all duration-300`, showNav && `translate-x-[0]`)}>
					<IoCloseSharp className="w-8 h-8 absolute top-2 right-2" color="black" onClick={() => setShowNav(false)} />
					<div className="bg-gray-400/10 flex items-center py-10 gap-x-6 pl-6">
						<img src={accessToken !== "" ? userData.image : `/images/default-user.png`} className="w-[60px] aspect-square rounded-full" alt="" suppressHydrationWarning />
						<div className="flex flex-col gap-y-1">
							{userData.accessToken !== "" && (
								<p suppressHydrationWarning className="pl-2 text-gray-500 font-bold">
									{userData?.user_name}
								</p>
							)}

							<button
								suppressHydrationWarning
								className="bg-[var(--purple-primary)] text-white px-7 py-2 rounded-full font-bold"
								onClick={() => {
									if (userData.accessToken === "") {
										formModal.onOpen();
										setShowNav(false);
									} else {
										logout();
										toast.success("Đăng xuất thành công");
										setShowNav(false);
										if (pathName.includes("profile")) {
											router.push("/");
										}
									}
								}}>
								{userData.accessToken === "" ? `Đăng nhập` : `Đăng xuất`}
							</button>
						</div>
					</div>
					<ul className="flex flex-col  text-black/60 pt-6">
						<li
							className={twMerge(
								`hover:text-[var(--purple-primary)] pl-6 py-2 flex items-center gap-x-4 cursor-pointer`,
								pathName === "/profile" && `bg-[var(--border-player)] text-[var(--purple-primary)]`
							)}
							onClick={() => handleToProfile()}>
							<MusicIcon />
							<span className="uppercase">Cá nhân</span>
						</li>
						<li className={twMerge(`hover:text-[var(--purple-primary)] pl-6 py-2`, pathName === "/" && `bg-[var(--border-player)] text-[var(--purple-primary)]`)}>
							<Link className="flex items-center gap-x-4" href="/">
								<RadioIcon />
								<span className="uppercase">Khám phá</span>
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
						<li className={twMerge(`hover:text-[var(--purple-primary)] pl-6 py-2`, pathName === "/history" && `bg-[var(--border-player)] text-[var(--purple-primary)]`)}>
							<Link className="flex items-center gap-x-4" href="/history">
								<RadioMusicIcon />
								<span className="uppercase">History</span>
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
}

export default NavbarMobile;
