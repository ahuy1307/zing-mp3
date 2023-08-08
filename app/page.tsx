import AlbumContent from "@/components/AlbumContent";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import FormModal from "@/components/FormModal";
import MusicContent from "@/components/MusicContent";
import Navbar from "@/components/Navbar";
import NavbarMobile from "@/components/NavbarMobile";
import ThemeModal from "@/components/ThemeModal";
import { hotAlbum, popularAlbum } from "@/dataAlbum";
import dynamic from "next/dynamic";
import "react-loading-skeleton/dist/skeleton.css";

export default function Home() {
	return (
		<>
			<NavbarMobile />
			<Navbar />
			<Banner />
			<MusicContent />
			<AlbumContent title="Nghệ Sĩ Thịnh Hành" data={popularAlbum} />
			<AlbumContent title="Album Hot" data={hotAlbum} />
			<ThemeModal />
			<FormModal />
			<Footer />
		</>
	);
}
