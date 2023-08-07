import { ImgFooter } from "@/public/images/footer";

function Footer() {
	return (
		<div className="mt-10 px-[10px] md:pl-[100px] xl:pl-[300px] md:px-[30px] xl:px-[60px]">
			<h2 className="text-[#ffffff80] text-center font-bold pt-6 pb-4">ĐỐI TÁC ÂM NHẠC</h2>
			<div className="grid grid-cols-3 px-[10px] md:px-[0px] gap-4 sm:grid-cols-4 xl:grid-cols-8 lg:grid-cols-4s">
				{ImgFooter.map((item) => {
					return (
						<div key={item.src} className="relative bg-white rounded-md flex items-center justify-center aspect-[1/0.5]">
							<img src={item.src} alt="" className="object-cover h-auto w-auto max-h-[80%] max-w-[80%]" />
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default Footer;
