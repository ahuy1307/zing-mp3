"use client";
import { apiUrl } from "@/constant";
import useDebounce from "@/hooks/useDebounce";
import { Song } from "@/interface";
import formatNumber from "@/utils/formatNumber";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { ClipLoader } from "react-spinners";
import { twMerge } from "tailwind-merge";
import SearchItem from "./SearchItem";

function SearchInput() {
	const [isFocus, setIsFocus] = useState(false);
	const [searchTitle, setSearchTitle] = useState("");
	const [searchResult, setSearchResult] = useState<Song[]>([]);
	const [isSearching, setIsSearching] = useState(false);
	const debounceSearch = useDebounce(searchTitle, 1000);
	const [searchFocus, setSearchFocus] = useState(false);

	useEffect(() => {
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
	}, [debounceSearch]);

	return (
		<div className="relative ">
			<label htmlFor="search">
				<HiMagnifyingGlass className="absolute top-[50%] left-2 translate-y-[-50%] w-5 h-5" color="var(--text-primary)" />
			</label>
			{isSearching && (
				<ClipLoader
					size={18}
					color="var(--text-primary)"
					cssOverride={{
						position: "absolute",
						top: "12px",
						right: "20px",
					}}
				/>
			)}
			{!isSearching && searchTitle !== "" && <AiOutlineClose className="absolute top-[50%] right-4 translate-y-[-50%] w-4 h-4" color="var(--text-primary)" onClick={() => setSearchTitle("")} />}
			<input
				value={searchTitle}
				onChange={(e) => setSearchTitle(e.target.value)}
				onFocus={() => setIsFocus(true)}
				onBlur={() => {
					setTimeout(() => {
						setIsFocus(false);
					}, 100);
					setSearchFocus(false);
				}}
				type="text"
				name=""
				placeholder="Tìm kiếm bài hát, nghệ sĩ,..."
				id="search"
				className={twMerge(
					`bg-gray-500/40 h-[40px] rounded-full pl-8 w-[350px] placeholder:text-[var(--text-primary)] placeholder:text-sm outline-none border-none text-[var(--text-primary)] xl:w-[500px] pr-12`,
					(searchFocus || isFocus) && `bg-[var(--primary-bg)] rounded-tl-2xl rounded-tr-2xl rounded-bl-none rounded-br-none`
				)}
			/>
			{(isFocus || searchFocus) && (
				<div
					className="w-full absolute bottom-0 left-0 bg-[var(--primary-bg)] translate-y-[calc(100%-8px)] rounded-bl-2xl rounded-br-2xl overflow-y-scroll max-h-[calc(100vh-180px)] scroll-search overflow-hidden"
					onMouseEnter={() => setSearchFocus(true)}
					onMouseDown={() => {
						setTimeout(() => {
							setSearchFocus(true);
						}, 100);
					}}>
					<p className="text-sm font-bold px-[10px] py-[15px] text-[var(--text-primary)]">{searchResult.length === 0 ? `Nhập thông tin tìm kiếm` : "Gợi ý kết quả"}</p>
					{searchResult.length > 0 && (
						<div>
							<div className="flex items-center gap-x-2 p-2 hover:bg-[var(--border-player)] rounded-md cursor-pointer">
								<img src={searchResult[searchResult.length - 1].image_music} className="w-[52px] h-[52px] rounded-full object-cover" alt="" />
								<div className="text-sm">
									<p className="font-bold text-[var(--text-primary)]">{searchResult[searchResult.length - 1].name_singer}</p>
									<div className="text-[var(--text-secondary)] flex gap-x-1">
										<span>{searchResult[searchResult.length - 1].category}</span>
										<span>.</span>
										<span>{formatNumber(searchResult[searchResult.length - 1].favorite, 0)} quan tâm</span>
									</div>
								</div>
							</div>
							{searchResult.map((item: Song) => {
								return <SearchItem song={item} key={item._id} />;
							})}
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default SearchInput;
