"use client";
import FormModal from "@/components/FormModal";
import MusicSong from "@/components/MusicSong";
import Navbar from "@/components/Navbar";
import NavbarMobile from "@/components/NavbarMobile";
import ThemeModal from "@/components/ThemeModal";
import { apiUrl } from "@/constant";
import { Song } from "@/interface";
import { Skeleton } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { BsFillPlayFill } from "react-icons/bs";

function NewSongs() {
	const [listSong, setListSong] = useState<Song[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (typeof window !== "undefined") {
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const res = await axios.get(`${apiUrl}/music/new-music`, {
					params: {
						_limit: 100,
					},
				});

				setListSong(res.data.data);
				setIsLoading(false);
			} catch (error) {
				setIsLoading(false);
			}
		};
		fetchData();
	}, []);

	return (
		<>
			<Navbar />
			<NavbarMobile />
			<div className="text-[var(--text-primary)] px-[10px] md:pl-[100px] xl:pl-[300px] md:px-[30px] xl:px-[60px]">
				<div className="mt-[100px] mb-[42px] flex items-center gap-x-4 px-[10px]">
					<h1 className="text-[var(--text-primary)] font-bold text-2xl">Nhạc Mới</h1>
					<button className="bg-[var(--purple-primary)] rounded-full p-[6px] hover:bg-white hover:ring-2 origin-center transition-all duration-300 group">
						<BsFillPlayFill className="w-7 h-7 relative left-[2px] group-hover:text-[var(--purple-primary)] text-white" />
					</button>
				</div>
				<div className="mt-5 grid grid-cols-1 gap-x-2">
					{listSong.length === 0 &&
						Array(10)
							.fill(0)
							.map((item, index) => {
								return (
									<div key={index} className="flex gap-x-4 px-[10px] mb-4">
										<div className="bg-gray-700/20 w-[50px] h-[50px] rounded-md"></div>
										<div className="flex flex-col gap-y-3 mt-2">
											<div className="bg-gray-700/20 h-[10px] w-[100px] sm:w-[200px] rounded-md "></div>
											<div className="bg-gray-700/20 h-[10px] w-[200px] sm:w-[400px] rounded-md"></div>
										</div>
									</div>
								);
							})}
					{listSong.map((item, index) => {
						return !isLoading ? (
							<MusicSong key={item._id} song={item} trending={true} />
						) : (
							<div key={item._id} className="flex gap-x-4 pb-3 p-[10px]">
								<Skeleton.Button
									active
									rootClassName="bg-gray-700/30 rounded-md trending-skeleton"
									style={{
										width: "50px",
										height: "50px",
									}}></Skeleton.Button>
								<div className="flex flex-col mt-2">
									<Skeleton.Button
										active
										size="large"
										style={{
											height: "10px",
										}}
									/>
									<Skeleton.Input
										active
										size="large"
										style={{
											height: "10px",
										}}
									/>
								</div>
							</div>
						);
					})}
				</div>
			</div>
			<ThemeModal />
			<FormModal />
		</>
	);
}

export default NewSongs;
