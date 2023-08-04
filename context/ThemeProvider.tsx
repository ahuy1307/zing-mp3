"use client";

import useLocalStorage from "@/hooks/useLocalStorage";
import { createContext, ReactNode, useContext, useState } from "react";

type Theme = {
	title: string;
	img: string;
	properties: {
		backgroundImg?: string;
		colorPrimary: string;
		textHover: string;
		layoutBg: string;
		layoutHeaderBg: string;
		sidebarBg?: string;
		playerBg: string;
		primaryBg: string;
		textPrimary: string;
		textSecondary: string;
		purplePrimary: string;
		newSongLayout: string;
		borderPlayer: string;
		backgrondSize?: string;
		sidebarPoup: string;
	};
};

type ThemeProps = {
	testTheme: Theme;
	themeCurrent: Theme;
	handleTestThem: (data: Theme) => void;
	activeTheme: (data: Theme) => void;
	removeTestTheme: () => void;
};

const ThemeContext = createContext({} as ThemeProps);

export function useTheme() {
	return useContext(ThemeContext);
}

function ThemeContextProvider({ children }: { children: ReactNode }) {
	const [testTheme, setTestTheme] = useState<Theme>({
		title: "",
		img: "",
		properties: {
			colorPrimary: "",
			textHover: "",
			layoutBg: "",
			sidebarBg: "",
			layoutHeaderBg: "",
			playerBg: "",
			primaryBg: "",
			textPrimary: "",
			textSecondary: "",
			purplePrimary: "",
			newSongLayout: "",
			borderPlayer: "",
			sidebarPoup: "",
		},
	});

	const [themeCurrent, setThemeCurrent] = useLocalStorage<Theme>("themeCurrent", {
		title: "Mặc định",
		img: "/images/theme/card-list/card_theme_purple.jpg",
		properties: {
			colorPrimary: "#170f23",
			textHover: "#c273ed",
			layoutBg: "#170f23",
			sidebarBg: "#231b2e",
			layoutHeaderBg: "rgba(23, 15, 35, 0.666)",
			playerBg: "#130c1c",
			primaryBg: "#34224f",
			textPrimary: "#fff",
			textSecondary: "hsla(0, 0%, 100%, 0.5)",
			purplePrimary: "#9b4de0",
			newSongLayout: "url(https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.9.9/static/media/new-release-bg.73d8f976.jpg)",
			borderPlayer: "hsla(0,0%,100%,0.1)",
			sidebarPoup: "#2a213a",
		},
	});

	const handleTestThem = (data: Theme) => {
		setTestTheme(data);
	};

	const activeTheme = (data: Theme) => {
		setThemeCurrent(data);
	};

	const removeTestTheme = () => {
		setTestTheme({
			title: "",
			img: "",
			properties: {
				colorPrimary: "",
				textHover: "",
				layoutBg: "",
				sidebarBg: "",
				layoutHeaderBg: "",
				playerBg: "",
				primaryBg: "",
				textPrimary: "",
				textSecondary: "",
				purplePrimary: "",
				newSongLayout: "",
				borderPlayer: "",
				sidebarPoup: "",
			},
		});
	};

	return <ThemeContext.Provider value={{ themeCurrent, handleTestThem, activeTheme, removeTestTheme, testTheme }}>{children}</ThemeContext.Provider>;
}

export default ThemeContextProvider;
