"use client";
import { Toaster } from "react-hot-toast";

function ToasterProvider() {
	return (
		<Toaster
			toastOptions={{
				// Define default options
				className: "",
				duration: 5000,
				style: {
					background: "#363636",
					color: "#fff",
				},

				// Default options for specific types
				success: {
					duration: 3000,
					theme: {
						primary: "green",
						secondary: "black",
					},
				},
			}}
		/>
	);
}

export default ToasterProvider;
