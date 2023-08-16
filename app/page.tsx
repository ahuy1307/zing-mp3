import AlbumContent from "@/components/AlbumContent";
import Banner from "@/components/Banner";
import FormModal from "@/components/FormModal";
import MusicContent from "@/components/MusicContent";
import Navbar from "@/components/Navbar";
import NavbarMobile from "@/components/NavbarMobile";
import ThemeModal from "@/components/ThemeModal";
import { hotAlbum, popularAlbum } from "@/dataAlbum";

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
		</>
	);
}
