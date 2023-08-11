import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeContextProvider from "@/context/ThemeProvider";
import AuthProvider from "@/context/AuthProvider";
import ToasterProvider from "@/context/ToasterProvider";
import ScrollToTop from "@/components/ScrollToTop";
import FavoriteProvider from "@/context/FavoriteProvider";

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
				<AuthProvider>
					<FavoriteProvider>
						<ThemeContextProvider>{children}</ThemeContextProvider>
					</FavoriteProvider>
				</AuthProvider>
				<ScrollToTop />
			</body>
		</html>
	);
}
