"use client";
import { usePlayer } from "@/context/PlayProvider";
import React, { useEffect, useRef, useState } from "react";

function AudioElement() {
	const [isClient, setIsClient] = useState(false);
	const ref = React.useRef<HTMLAudioElement>(null);

	const { songActive, isPlayingSong, handleSetPlaying } = usePlayer();

	useEffect(() => {
		setIsClient(true);
	}, []);

	const handleCanPlay = () => {
		if (isPlayingSong) {
			ref.current && ref.current.play();
		} else {
			ref.current && ref.current.pause();
		}
	};

	useEffect(() => {
		if (!ref.current) return;

		if (isPlayingSong) {
			ref.current!.play();
		} else {
			ref.current!.pause();
		}
	}, [isPlayingSong]);

	if (!isClient) return null;

	return <audio ref={ref} controls hidden src={songActive.src_music} autoPlay={isPlayingSong} onCanPlay={handleCanPlay} />;
}

export default AudioElement;
