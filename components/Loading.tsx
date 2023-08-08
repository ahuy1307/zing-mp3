import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Loading() {
	return (
		<div className="text-white">
			<SkeletonTheme baseColor="var(--border-player)" highlightColor="white">
				<Skeleton count={5} />
			</SkeletonTheme>
		</div>
	);
}

export default Loading;
