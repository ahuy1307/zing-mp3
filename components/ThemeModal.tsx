"use client";
import { useTheme } from "@/context/ThemeProvider";
import { useThemeModal } from "@/hooks/useThemeModal";
import { listThemeCard } from "@/constant";
import { useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

function ThemeModal() {
	const { isOpen, onClose } = useThemeModal();
	const { themeCurrent, testTheme, activeTheme, handleTestThem, removeTestTheme } = useTheme();

	useEffect(() => {
		if (testTheme.title !== "") {
			document.documentElement.style.setProperty("--purple-primary", testTheme?.properties?.purplePrimary);
			document.documentElement.style.setProperty("--primary", testTheme?.properties?.layoutBg ?? "trenparent");

			document.documentElement.style.setProperty("--sidebar-bg", testTheme?.properties?.sidebarBg ?? "rgba(0,0,0,0.25)");
			document.documentElement.style.setProperty("--text-primary", testTheme?.properties?.textPrimary);
			document.documentElement.style.setProperty("--text-secondary", testTheme?.properties?.textSecondary);

			document.documentElement.style.setProperty("--layout-header-bg", testTheme?.properties?.layoutHeaderBg);
			document.documentElement.style.setProperty("--primary-bg", testTheme?.properties?.primaryBg);
			document.documentElement.style.setProperty("--player-bg", testTheme?.properties?.playerBg);
			document.documentElement.style.setProperty("--background-section", `url(${testTheme?.properties?.backgroundImg})`);
			document.documentElement.style.setProperty("--link-text-hover", testTheme?.properties?.textHover);
			document.documentElement.style.setProperty("--newsonglayout-bg", testTheme?.properties?.newSongLayout);
			document.documentElement.style.setProperty("--border-player", testTheme?.properties?.borderPlayer);
			document.documentElement.style.setProperty("--background-section-size", testTheme?.properties?.backgrondSize ?? "1920px auto");
			document.documentElement.style.setProperty("--sidebar-popup-bg", testTheme?.properties?.sidebarPoup);
		} else if (testTheme.title === "" && themeCurrent?.title !== undefined) {
			document.documentElement.style.setProperty("--purple-primary", themeCurrent?.properties?.purplePrimary);
			document.documentElement.style.setProperty("--primary", themeCurrent?.properties?.layoutBg ?? "trenparent");

			document.documentElement.style.setProperty("--sidebar-bg", themeCurrent?.properties?.sidebarBg ?? "rgba(0,0,0,0.25)");
			document.documentElement.style.setProperty("--text-primary", themeCurrent?.properties?.textPrimary);
			document.documentElement.style.setProperty("--text-secondary", themeCurrent?.properties?.textSecondary);

			document.documentElement.style.setProperty("--layout-header-bg", themeCurrent?.properties?.layoutHeaderBg);
			document.documentElement.style.setProperty("--primary-bg", themeCurrent?.properties?.primaryBg);
			document.documentElement.style.setProperty("--player-bg", themeCurrent?.properties?.playerBg);
			document.documentElement.style.setProperty("--background-section", `url(${themeCurrent?.properties?.backgroundImg})`);
			document.documentElement.style.setProperty("--link-text-hover", themeCurrent?.properties?.textHover);
			document.documentElement.style.setProperty("--newsonglayout-bg", themeCurrent?.properties?.newSongLayout);
			document.documentElement.style.setProperty("--border-player", themeCurrent?.properties?.borderPlayer);
			document.documentElement.style.setProperty("--background-section-size", themeCurrent?.properties?.backgrondSize ?? "1920px auto");
			document.documentElement.style.setProperty("--sidebar-popup-bg", themeCurrent?.properties?.sidebarPoup);
		}
	}, [themeCurrent, testTheme.title]);

	return (
		<>
			{isOpen && (
				<div
					className="bg-black/30 fixed inset-0 w-[100vw] h-[100vh] z-30"
					onClick={() => {
						onClose();
						removeTestTheme();
					}}></div>
			)}
			<div
				className={twMerge(
					`fixed top-[50%] left-[50%] w-[90vw] h-[80vh] max-h-[80vh] max-w-[900px] overflow-auto bg-[var(--primary-bg)] rounded-lg translate-x-[-50%] translate-y-[-50%] z-40 text-[var(--text-primary)] scale-[0.001] transition-all origin-center duration-300`,
					isOpen && `scale-100`
				)}>
				<h1 className="p-6 text-xl font-bold">GIAO DIỆN</h1>
				<IoCloseSharp
					className="w-8 h-8 absolute top-6 right-6"
					color="var(--text-primary)"
					onClick={() => {
						onClose();
						removeTestTheme();
					}}
				/>
				<h3 className="px-6 py-3 text-lg font-bold">Nghệ sĩ</h3>
				<div className="grid grid-cols-2 px-6 gap-6 pb-6 md:grid-cols-3 lg:grid-cols-4">
					{listThemeCard.map((item: any) => {
						return (
							<div key={item.img} className="rounded-md overflow-hidden cursor-pointer group relative">
								<img
									src={item.img}
									className={twMerge(
										`rounded-md group-hover:brightness-50 group-hover:scale-110 duration-300 transition-all`,
										themeCurrent.title && item.title == themeCurrent.title && `border-2 border-[var(--purple-primary)]`
									)}
									alt=""
								/>
								<div className="absolute top-[calc(50%-12px)] left-[50%] translate-x-[-50%] translate-y-[-50%] hidden group-hover:block">
									<button className="bg-[var(--purple-primary)] text-xs text-[var(--white)] py-1 rounded-full font-bold w-[120px]" onClick={() => activeTheme(item)}>
										Áp dụng
									</button>
									<button className="bg-black/20 text-xs text-[var(--white)] py-1 rounded-full font-bold w-[120px] mt-3" onClick={() => handleTestThem(item)}>
										Xem trước
									</button>
								</div>
								<p className="mt-2">{item.title}</p>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}

export default ThemeModal;
