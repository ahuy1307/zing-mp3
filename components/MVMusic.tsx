"use client";
import { usePlayer } from "@/context/PlayProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import { useEffect, useRef, useState } from "react";
import { IoClose, IoCloseOutline } from "react-icons/io5";
import { twMerge } from "tailwind-merge";
import FavoriteButton from "./FavoriteButton";

function MVMusic({ className, setShow, show }: { className?: string; setShow?: React.Dispatch<React.SetStateAction<boolean>>; show: boolean }) {
	const { songActive } = usePlayer();
	const router = useRouter();
	const mvRef = useRef(null);
	const [linkMV, setLinkMV] = useState(() => {
		return songActive.link_mv;
	});

	useEffect(() => {
		if (show) {
			setLinkMV(songActive.link_mv);
		} else {
			setLinkMV("");
		}
	}, [show]);
	return (
		<div className={twMerge(`fixed inset-0 w-full h-full bg-[hsla(0,0%,78%,.929)] z-[99] translate-y-[100%] transition-all duration-500 overflow-hidden`, className)}>
			<div className="flex gap-x-3 items-center px-[30px] lg:px-[50px] mt-[30px]">
				<img className="w-[60px] h-[60px] object-cover rounded-full" src={songActive.image_music} alt="" />
				<div className="flex flex-col">
					<h3 className="font-bold">{songActive.name_music}</h3>
					<Link className="hover:underline" href={`/${songActive.slug_name_singer}`}>
						{songActive.name_singer}
					</Link>
				</div>
				<FavoriteButton id={songActive._id} />
				<div
					className="border-2 p-1 border-black/30 rounded-full ml-auto hover:bg-white cursor-pointer transition-all duration-300"
					onClick={() => {
						setShow?.(false);
						router.refresh();
					}}>
					<IoCloseOutline className="w-7 h-7 text-black/40" />
				</div>
			</div>
			<div className="absolute w-full h-[60vh] lg:h-[80vh] px-[30px] pt-[30px]">
				<iframe className="w-full h-full rounded-lg" src={`https://www.youtube.com/embed/${linkMV}`} allowFullScreen frameBorder={0} name="mv" tabIndex={1}></iframe>
			</div>
		</div>
	);
}

export default MVMusic;
