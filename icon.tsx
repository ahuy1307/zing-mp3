import { twMerge } from "tailwind-merge";

export const MusicIcon = ({ className }: { className?: string }) => {
	return (
		<svg width="20" className={className} height="20" viewBox="0 0 20 20" fill="currentColor">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M5.41666 2.29166C5.07148 2.29166 4.79166 2.57148 4.79166 2.91666C4.79166 3.26183 5.07148 3.54166 5.41666 3.54166H14.5833C14.9285 3.54166 15.2083 3.26183 15.2083 2.91666C15.2083 2.57148 14.9285 2.29166 14.5833 2.29166H5.41666ZM2.5 8.33333C2.5 6.60744 3.89911 5.20833 5.625 5.20833H14.375C16.1009 5.20833 17.5 6.60744 17.5 8.33333V14.1667C17.5 15.8925 16.1009 17.2917 14.375 17.2917H5.625C3.89911 17.2917 2.5 15.8925 2.5 14.1667V8.33333ZM5.625 6.45833C4.58947 6.45833 3.75 7.29779 3.75 8.33333V14.1667C3.75 15.2022 4.58946 16.0417 5.625 16.0417H14.375C15.4105 16.0417 16.25 15.2022 16.25 14.1667V8.33333C16.25 7.29779 15.4105 6.45833 14.375 6.45833H5.625ZM12.5 7.3C11.3494 7.3 10.4166 8.23274 10.4166 9.38333V10.8832C10.1041 10.7235 9.75006 10.6333 9.37496 10.6333C8.10931 10.6333 7.0833 11.6594 7.0833 12.925C7.0833 14.1907 8.10931 15.2167 9.37496 15.2167C10.5759 15.2167 11.561 14.293 11.6587 13.1173C11.6639 13.0847 11.6666 13.0513 11.6666 13.0173V9.38333C11.6666 8.92309 12.0397 8.55 12.5 8.55H13.2291C13.5743 8.55 13.8541 8.27018 13.8541 7.925C13.8541 7.57982 13.5743 7.3 13.2291 7.3H12.5ZM8.3333 12.925C8.3333 12.3497 8.79967 11.8833 9.37496 11.8833C9.95026 11.8833 10.4166 12.3497 10.4166 12.925C10.4166 13.5003 9.95026 13.9667 9.37496 13.9667C8.79967 13.9667 8.3333 13.5003 8.3333 12.925Z"></path>
		</svg>
	);
};

export const RadioIcon = ({ className }: { className?: string }) => {
	return (
		<svg width="20" className={className} height="20" viewBox="0 0 20 20" fill="currentColor">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M2.70831 9.99998C2.70831 5.9729 5.9729 2.70831 9.99997 2.70831C14.027 2.70831 17.2916 5.9729 17.2916 9.99998C17.2916 14.0271 14.027 17.2916 9.99997 17.2916C5.9729 17.2916 2.70831 14.0271 2.70831 9.99998ZM9.99997 1.45832C5.28254 1.45832 1.45831 5.28255 1.45831 9.99998C1.45831 14.7174 5.28254 18.5416 9.99997 18.5416C14.7174 18.5416 18.5416 14.7174 18.5416 9.99998C18.5416 5.28255 14.7174 1.45832 9.99997 1.45832ZM7.70832 9.99999C7.70832 8.73433 8.73433 7.70832 9.99998 7.70832C11.2656 7.70832 12.2916 8.73433 12.2916 9.99999C12.2916 11.2656 11.2656 12.2917 9.99998 12.2917C8.73433 12.2917 7.70832 11.2656 7.70832 9.99999ZM9.99998 6.45832C8.04397 6.45832 6.45832 8.04398 6.45832 9.99999C6.45832 11.956 8.04397 13.5417 9.99998 13.5417C11.956 13.5417 13.5416 11.956 13.5416 9.99999C13.5416 8.04398 11.956 6.45832 9.99998 6.45832Z"></path>
		</svg>
	);
};

export const RadioMusicIcon = ({ className }: { className?: string }) => {
	return (
		<svg width="20" className={className} height="20" viewBox="0 0 20 20" fill="currentColor">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M9.89354 2.23314C9.92588 2.5768 9.67351 2.88161 9.32985 2.91395C5.73344 3.25241 2.91669 6.28764 2.91669 9.98335C2.91669 13.9063 6.08978 17.0842 10.0012 17.0842C13.9126 17.0842 17.0857 13.9063 17.0857 9.98335C17.0857 8.64722 16.7181 7.39911 16.0792 6.33293C15.9018 6.03684 15.998 5.65298 16.2941 5.47555C16.5902 5.29813 16.974 5.39432 17.1515 5.69041C17.9035 6.94541 18.3357 8.41479 18.3357 9.98335C18.3357 14.5941 14.6055 18.3342 10.0012 18.3342C5.39694 18.3342 1.66669 14.5941 1.66669 9.98335C1.66669 5.63873 4.9781 2.06798 9.21272 1.66945C9.55638 1.63711 9.86119 1.88948 9.89354 2.23314ZM9.888 5.16111C9.94053 5.50227 9.70655 5.82142 9.3654 5.87395C7.37765 6.18003 5.8535 7.90296 5.8535 9.98317C5.8535 11.1398 6.3238 12.1849 7.08437 12.9391C7.32947 13.1821 7.33114 13.5779 7.08809 13.823C6.84504 14.0681 6.44932 14.0697 6.20422 13.8267C5.21637 12.8472 4.6035 11.4862 4.6035 9.98317C4.6035 7.27863 6.58507 5.03735 9.17516 4.63851C9.51631 4.58598 9.83546 4.81996 9.888 5.16111ZM13.9577 7.23583C14.2645 7.07768 14.6415 7.19821 14.7996 7.50503C15.1826 8.24813 15.3986 9.09131 15.3986 9.98317C15.3986 12.9685 12.9833 15.3908 10.0011 15.3908C9.65588 15.3908 9.37606 15.111 9.37606 14.7658C9.37606 14.4206 9.65588 14.1408 10.0011 14.1408C12.2904 14.1408 14.1486 12.2806 14.1486 9.98317C14.1486 9.29509 13.9824 8.64781 13.6885 8.07772C13.5304 7.7709 13.6509 7.39397 13.9577 7.23583ZM11.9823 1.86989C11.647 1.78796 11.3087 1.99337 11.2268 2.32868C11.2095 2.39926 11.205 2.46996 11.2118 2.53838V7.83719C10.8544 7.63452 10.4414 7.51878 10.0011 7.51878C8.64088 7.51878 7.54048 8.62341 7.54048 9.98326C7.54048 11.3431 8.64088 12.4477 10.0011 12.4477C11.3613 12.4477 12.4617 11.3431 12.4617 9.98326C12.4617 9.95673 12.4613 9.9303 12.4604 9.90398C12.4613 9.8904 12.4618 9.8767 12.4618 9.8629V3.32221C13.1239 3.56802 13.7396 3.91035 14.292 4.33243C14.5663 4.54201 14.9585 4.48956 15.1681 4.21528C15.3777 3.94101 15.3252 3.54877 15.051 3.3392C14.1541 2.65392 13.1137 2.14635 11.9823 1.86989ZM10.0011 8.76878C9.33373 8.76878 8.79048 9.31128 8.79048 9.98326C8.79048 10.6552 9.33373 11.1977 10.0011 11.1977C10.6684 11.1977 11.2117 10.6552 11.2117 9.98326C11.2117 9.31128 10.6684 8.76878 10.0011 8.76878Z"></path>
		</svg>
	);
};

export const ScrollToTopIcon = ({ className }: { className?: string }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			aria-hidden="true"
			role="img"
			data-v-a4e4f557=""
			className={twMerge(`icon`, className)}
			width={"30px"}
			height={"30px"}
			viewBox="0 0 20 20"
			data-v-c3ad5561="">
			<path
				fill="currentColor"
				d="M10.755 6.426a1.998 1.998 0 1 1 2.825 2.827a1.998 1.998 0 0 1-2.825-2.827Zm2.119.708a.998.998 0 1 0-1.413 1.411a.998.998 0 0 0 1.413-1.411Zm-1.125 7.37a1.5 1.5 0 0 1-1.704-.295l-.609-.609l-.732 1.22a.5.5 0 0 1-.782.097l-2.83-2.831a.5.5 0 0 1 .096-.782l1.22-.732l-.61-.61a1.5 1.5 0 0 1-.295-1.703l-1.12-1.12a.5.5 0 0 1 0-.707l1.06-1.06a3.003 3.003 0 0 1 3.413-.589l.938-.937a6.294 6.294 0 0 1 6.33-1.557c.76.238 1.357.834 1.595 1.595a6.293 6.293 0 0 1-1.557 6.33l-.937.938a3.003 3.003 0 0 1-.59 3.413l-1.059 1.06a.5.5 0 0 1-.707 0l-1.12-1.12Zm4.076-11.26a5.294 5.294 0 0 0-5.324 1.309l-.816.815l.004.004l-.707.707l-.004-.004l-2.122 2.122l.004.004l-.403.403a.5.5 0 0 0 .048.651l4.248 4.247a.5.5 0 0 0 .652.047l.402-.401l.003.004l2.122-2.122l-.003-.004l.707-.707l.003.004l.816-.816a5.294 5.294 0 0 0 1.31-5.325a1.432 1.432 0 0 0-.94-.938Zm-3.307 10.615l.704.705l.707-.707a2.001 2.001 0 0 0 .52-1.93l-1.931 1.932Zm-4.438-8.3a2.001 2.001 0 0 0-1.93.52l-.706.707l.705.704l1.93-1.93Zm.627 7.312l-1.57-1.57l-.886.53l1.925 1.926l.531-.886Zm-2.904 2.04a.5.5 0 1 0-.707-.706l-1.768 1.768a.5.5 0 1 0 .707.707l1.768-1.768ZM4.388 12.79a.5.5 0 0 1 0 .707l-.71.709a.5.5 0 0 1-.706-.708l.709-.708a.5.5 0 0 1 .707 0Zm2.83 3.537a.5.5 0 0 0-.707-.707l-.709.709a.5.5 0 1 0 .707.707l.71-.709Z"></path>
		</svg>
	);
};
