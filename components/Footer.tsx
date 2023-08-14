import { ImgFooter } from "@/public/images/footer";

function Footer() {
	return (
		<div className="mt-10 px-[10px] md:pl-[100px] xl:pl-[300px] md:px-[30px] xl:px-[60px] pb-[100px] hidden md:block">
			<h2 className="text-[#ffffff80] text-center font-bold pt-6 pb-4">ĐỐI TÁC ÂM NHẠC</h2>
			<div className="grid grid-cols-3 px-[10px] md:px-[0px] gap-4 sm:grid-cols-4 xl:grid-cols-8 lg:grid-cols-5">
				{ImgFooter.map((item) => {
					return (
						<div key={item.src} className="relative bg-white rounded-md flex items-center justify-center w-[100px] h-[60px] sm:w-[150px]">
							<img src={item.src} alt="" className="object-contain h-auto max-h-[80%] max-w-[80%] w-full" />
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default Footer;
