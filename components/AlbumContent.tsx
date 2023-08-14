import { Tooltip } from "antd";
import Link from "next/link";
import { AiOutlineHeart } from "react-icons/ai";
import { BsPlayCircle, BsThreeDots } from "react-icons/bs";
import { twMerge } from "tailwind-merge";
function AlbumContent({ title, data }: { title: string; data: any[] }) {
	return (
		<div className="text-[var(--text-primary)] px-[10px] md:pl-[100px] xl:pl-[300px] md:px-[30px] xl:px-[60px] pb-[100px]">
			<h1 className="font-bold text-lg pb-6 pt-6">{title}</h1>
			<div className="grid grid-cols-2 gap-4 px-[10px] md:px-[0px] sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:gap-6">
				{data.map((item, index) => {
					return (
						<Link href={item.link} key={index} className={twMerge(`flex flex-col gap-y-2 overflow-hidden cursor-pointer rounded-md`, index === 4 && `lg:hidden xl:block`)}>
							<div className="relative group">
								<img src={item.thumbnail} className="rounded-md group-hover:scale-105  duration-500 origin-bottom select-none group-hover:brightness-[0.6]" alt="" loading="lazy" />
								<div className="items-center justify-between absolute top-[50%] translate-y-[-50%] w-full px-5 hidden group-hover:flex">
									<Tooltip title="Add album">
										<AiOutlineHeart className="w-6 h-6" color="white" />
									</Tooltip>
									<BsPlayCircle className="w-10 h-10" color="white" />
									<Tooltip title="Khác">
										<BsThreeDots className="w-6 h-6" color="white" />
									</Tooltip>
								</div>
							</div>
							<h3 className="font-bold line-clamp-1 text-sm hover:text-[var(--purple-primary)]">{item.title}</h3>
							<div className="flex gap-x-1">
								{item.singer.map((item: string) => {
									return (
										<p key={item} className="text-sm hover:underline hover:text-[var(--purple-primary)]">
											{item}
										</p>
									);
								})}
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
}

export default AlbumContent;
