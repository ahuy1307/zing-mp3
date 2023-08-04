import { HiMagnifyingGlass } from "react-icons/hi2";

function SearchInput() {
	return (
		<div className="relative ">
			<HiMagnifyingGlass className="absolute top-[50%] right-2 translate-y-[-50%] w-5 h-5" color="var(--text-primary)" />
			<input
				type="text"
				name=""
				placeholder="Tìm kiếm bài hát, nghệ sĩ,..."
				id=""
				className="bg-gray-500/40 h-[40px] rounded-full pl-4 w-[300px] placeholder:text-[var(--text-primary)] placeholder:text-sm outline-none border-none text-[var(--text-primary)] xl:w-[500px] pr-12"
			/>
		</div>
	);
}

export default SearchInput;
