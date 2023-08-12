export default function formatDate(date: Date) {
	const newDate = new Date(date);
	let year = newDate.getFullYear();
	let month = (1 + newDate.getMonth()).toString().padStart(2, "0");
	let day = newDate.getDate().toString().padStart(2, "0");

	return day + "/" + month + "/" + year;
}
