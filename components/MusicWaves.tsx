import { twMerge } from "tailwind-merge";

function MusicWaves({ className }: { className?: string }) {
	return (
		<div className={twMerge(`music-waves`, className)}>
			<span></span>
			<span></span>
			<span></span>
			<span></span>
		</div>
	);
}

export default MusicWaves;
