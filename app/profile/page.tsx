"use client";
import FormModal from "@/components/FormModal";
import MusicSong from "@/components/MusicSong";
import Navbar from "@/components/Navbar";
import NavbarMobile from "@/components/NavbarMobile";
import ThemeModal from "@/components/ThemeModal";
import { useAuth } from "@/context/AuthProvider";
import { useFavorite } from "@/context/FavoriteProvider";
import { RandomIcon } from "@/icon";
import { useEffect, useState } from "react";
import { BsFillPlayFill } from "react-icons/bs";

function ProfilePage() {
	const { favoriteSongs, getFavoriteSongs, isLoading } = useFavorite();
	const { accessToken } = useAuth();

	useEffect(() => {
		getFavoriteSongs(accessToken);
	}, []);

	return (
		<>
			<Navbar />
			<NavbarMobile />
			<div className="text-[var(--text-primary)] px-[10px] md:pl-[100px] xl:pl-[300px] md:px-[30px] xl:px-[60px]">
				<div className="mt-[100px] mb-[24px] flex items-center gap-x-2 px-[10px]">
					<h1 className="text-[var(--text-primary)] font-bold text-2xl">Thư Viện</h1>
					<button className="bg-[var(--purple-primary)] rounded-full p-[6px] hover:bg-white hover:ring-2 origin-center transition-all duration-300 group">
						<BsFillPlayFill className="w-7 h-7 relative left-[2px] group-hover:text-[var(--purple-primary)] text-white" />
					</button>
				</div>
				<div className="px-[10px]">
					<h2 className="text-2xl font-bold">Nghệ Sĩ</h2>
					<div className="mt-8 grid grid-cols-1 gap-x-6 min-[400px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
						<div className="relative ">
							<div className="overflow-hidden rounded-full">
								<img
									src="https://res.cloudinary.com/phuockaito/image/upload/v1665717219/image_music/w9vktalejcum3gdhcdbm.jpg"
									className="rounded-full hover:scale-125 transition-all duration-500"
									alt=""
								/>
							</div>
							<div className="absolute right-4 bottom-5 bg-white p-2 rounded-full cursor-pointer">
								<RandomIcon />
							</div>
							<p className="text-center pt-2 text-sm hover:underline hover:text-[var(--purple-primary)] cursor-pointer">Son Tung - MTP</p>
						</div>
					</div>
					<h2 className="text-2xl font-bold mt-7">Playlist Favorite</h2>
					<div className="mt-4 grid grid-cols-1 gap-x-2">
						{isLoading &&
							favoriteSongs.length === 0 &&
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
						{favoriteSongs.map((item) => {
							return <MusicSong song={item.music} key={item.music._id} trending={true} />;
						})}
						{!isLoading && favoriteSongs.length === 0 && <span className="text-white">Chưa thêm bài hát nào vào thư viện...</span>}
					</div>
				</div>
			</div>
			<ThemeModal />
			<FormModal />
		</>
	);
}

export default ProfilePage;
