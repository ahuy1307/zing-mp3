"use client";
import useLocalStorage from "@/hooks/useLocalStorage";
import axios from "axios";
import { createContext, ReactNode, useContext, useState } from "react";
import toast from "react-hot-toast";
import { apiUrl } from "../constant";

type UserProps = {
	image: string;
	sum_list_music: number | null;
	sum_upload: number | null;
	user_name: string;
};
type AuthProps = {
	accessToken: string;
	userData: UserProps;
	login: (data: { email: string; password: string }) => Promise<{ success: boolean } | undefined>;
	register: (data: { userName: string; email: string; password: string }) => Promise<{ success: boolean } | undefined>;
	getUserProfile: (accessToken: string) => void;
	logout: () => void;
};

const AuthContext = createContext({} as AuthProps);

export function useAuth() {
	return useContext(AuthContext);
}

function AuthProvider({ children }: { children: ReactNode }) {
	const [accessToken, setAccessToken] = useLocalStorage<string>("accessToken", "");
	const [userData, setUserData] = useState({} as UserProps);

	const login = async (data: { email: string; password: string }) => {
		try {
			const res = await axios.post(`${apiUrl}/account/login`, data);
			setUserData(res.data.data);
			setAccessToken(res.data.accessToken);

			return { success: true };
		} catch (error) {
			return { success: false };
		}
	};

	const register = async (data: { userName: string; email: string; password: string }) => {
		try {
			const res = await axios.post(`${apiUrl}/account/register`, data);
			return { success: true };
		} catch (error) {
			return { success: false };
		}
	};

	const getUserProfile = async (accessToken: string) => {
		try {
			const res = await axios.get(`${apiUrl}/account/profile`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
			setUserData(res.data.data);
		} catch (error) {
			// console.log(error);
		}
	};

	const logout = () => {
		setAccessToken("");
	};

	return <AuthContext.Provider value={{ accessToken, login, register, userData, getUserProfile, logout }}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
