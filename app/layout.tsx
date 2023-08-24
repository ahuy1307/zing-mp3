import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeContextProvider from "@/context/ThemeProvider";
import AuthProvider from "@/context/AuthProvider";
import ToasterProvider from "@/context/ToasterProvider";
import ScrollToTop from "@/components/ScrollToTop";
import FavoriteProvider from "@/context/FavoriteProvider";
import PlayerProvider from "@/context/PlayProvider";
import AudioElement from "@/components/AudioElement";
import PlayMusic from "@/components/PlayMusic";
import HistoryProvider from "@/context/HistoryProvider";
import QueryProvider from "@/context/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Zing MP3 Clone",
	description: "This is zing mp3 clone",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ToasterProvider />
				<QueryProvider>
					<AuthProvider>
						<HistoryProvider>
							<PlayerProvider>
								<FavoriteProvider>
									<ThemeContextProvider>{children}</ThemeContextProvider>
									<PlayMusic />
								</FavoriteProvider>
								<AudioElement />
							</PlayerProvider>
						</HistoryProvider>
					</AuthProvider>
				</QueryProvider>
				<ScrollToTop />
			</body>
		</html>
	);
}
