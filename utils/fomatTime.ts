export const formatTime = (time: number) => {
	const minutes = Math.floor(time / 60) > 0 ? Math.floor(time / 60) : 0;

	const secondLast = Math.floor(time - minutes * 60);

	return `${minutes >= 10 ? `${minutes}:` : `${minutes}:`}${secondLast >= 10 ? `${secondLast}` : `0${secondLast}`}`;
};
