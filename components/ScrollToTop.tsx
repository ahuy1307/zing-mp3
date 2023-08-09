"use client";
import { ScrollToTopIcon } from "@/icon";
import { useEffect, useState } from "react";

function ScrollToTop() {
	const [position, setPosition] = useState(0);

	const handleChangePosition = () => {
		if (typeof window !== "undefined") setPosition(window.pageYOffset);
	};
	useEffect(() => {
		if (typeof window !== "undefined") setPosition(window.pageYOffset);
		window.addEventListener("scroll", handleChangePosition, { passive: true });

		return () => window.removeEventListener("scroll", handleChangePosition);
	}, []);

	const handleScrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<>
			{position > 1400 && (
				<button
					onClick={handleScrollToTop}
					className="fixed right-4 bottom-6 -rotate-45 rounded-full bg-gray-100 aspect-square p-2 sm:bottom-6 sm:right-6 opacity-100 pointer-events-auto shadow">
					<ScrollToTopIcon />
				</button>
			)}
		</>
	);
}

export default ScrollToTop;
