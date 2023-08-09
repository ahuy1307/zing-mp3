"use client";
import { useFormModal } from "@/hooks/useFormModal";
import { twMerge } from "tailwind-merge";
import { AiOutlineClose } from "react-icons/ai";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthProvider";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

function FormModal() {
	const { isOpen, onClose } = useFormModal();
	const { login, register } = useAuth();
	const [isLoading, setIsLoading] = useState(false);
	const [loginForm, setLoginForm] = useState(true);
	const [form, setForm] = useState({
		user: "",
		email: "",
		password: "",
		passwordConfirm: "",
	});
	const [msgValidator, setMsgValidator] = useState({
		user: "",
		password: "",
		passwordConfirm: "",
	});

	const onChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
		setForm((prev) => {
			return {
				...prev,
				[e.target.name]: e.target.value,
			};
		});
	};

	const handleValidate = () => {
		const msg = {
			user: "",
			password: "",
			passwordConfirm: "",
		};

		if (loginForm) {
			return true;
		} else {
			if (form.user !== "") {
				const testUser = new RegExp("^[a-z0-9_-]{8,20}$");
				if (!testUser.test(form.user)) msg.user = "User phải từ 8-20 kí tự bao gồm số";
			}
			if (form.password !== "") {
				const testPassword = new RegExp("^.{8,}$");
				if (!testPassword.test(form.password)) msg.password = "Mật khẩu phải lớn hơn 8";
			}
			if (form.passwordConfirm !== "" && form.passwordConfirm !== form.password) {
				msg.passwordConfirm = "Mật khẩu không trùng khớp";
			}
			setMsgValidator(msg);
		}
		if (msg.user !== "" || msg.password !== "" || msg.passwordConfirm !== "") return false;
		return true;
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			setIsLoading(true);
			if (loginForm) {
				const res = await login({
					email: form.email,
					password: form.password,
				});
				if (res?.success) {
					toast.success("Đăng nhập thành công!");
					setForm({
						user: "",
						email: "",
						password: "",
						passwordConfirm: "",
					});
					onClose();
				} else {
					toast.error("Sai email or/and password!");
				}
			} else {
				const isValid = handleValidate();
				if (!isValid) {
					setIsLoading(false);
					return;
				}

				const res = await register({
					userName: form.user,
					email: form.email,
					password: form.password,
				});
				if (res?.success) {
					toast.success("Đăng kí thành công!");
					setLoginForm(true);
				} else {
					toast.error("Email này đã được sử dụng");
				}
			}
			setIsLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			{isOpen && (
				<div
					className="bg-black/30 fixed inset-0 w-[100vw] h-[100vh] z-30"
					onClick={() => {
						onClose();
						setForm({
							user: "",
							email: "",
							password: "",
							passwordConfirm: "",
						});
						setLoginForm(true);
					}}></div>
			)}
			<div
				className={twMerge(
					`fixed top-[50%] left-[50%] w-[90vw] max-h-[80vh] max-w-[800px] overflow-auto bg-[var(--player-bg)] rounded-lg translate-x-[-50%] translate-y-[-50%] z-40 text-[var(--text-primary)] transition-all origin-center duration-300 scale-[0.001] p-[20px]`,
					isOpen && `scale-100`
				)}>
				<h2 className="text-[var(--text-primary)] font-bold text-center text-2xl mt-4">{loginForm ? `Đăng nhập` : `Đăng kí`}</h2>
				<AiOutlineClose
					className="absolute top-4 right-6 w-9 h-9 bg-[var(--border-player)] rounded-full p-2"
					onClick={() => {
						onClose();
						setForm({
							user: "",
							email: "",
							password: "",
							passwordConfirm: "",
						});
						setLoginForm(true);
					}}
				/>
				<form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-2">
					{loginForm ? (
						<>
							<label htmlFor="email" className="text-[var(--text-primary)] font-semibold">
								Email
							</label>
							<input
								type="email"
								name="email"
								value={form.email}
								id="email"
								required
								disabled={isLoading}
								placeholder="Nhập email..."
								className="h-[40px] pl-2 placeholder:text-sm placeholder:text-[var(--text-primary)] rounded-md bg-[var(--primary-bg)] disabled:opacity-60 disabled:cursor-not-allowed"
								onChange={(e) => onChangeForm(e)}
							/>
							<label htmlFor="password" className="text-[var(--text-primary)] font-semibold">
								Password
							</label>
							<input
								disabled={isLoading}
								type="password"
								name="password"
								id="password"
								value={form.password}
								required
								placeholder="Mật khẩu..."
								className="h-[40px] pl-2 placeholder:text-sm placeholder:text-[var(--text-primary)] rounded-md bg-[var(--primary-bg)] disabled:opacity-60 disabled:cursor-not-allowed"
								onChange={(e) => onChangeForm(e)}
							/>
						</>
					) : (
						<>
							<label htmlFor="user" className="text-[var(--text-primary)] font-semibold">
								User
							</label>
							<input
								disabled={isLoading}
								type="text"
								name="user"
								id="user"
								value={form.user}
								required
								placeholder="Tên của bạn"
								className="h-[40px] pl-2 placeholder:text-sm placeholder:text-[var(--text-primary)] rounded-md bg-[var(--primary-bg)] disabled:opacity-60 disabled:cursor-not-allowed"
								onChange={(e) => onChangeForm(e)}
							/>
							<span className="text-red-500">{msgValidator.user}</span>
							<label htmlFor="emailRegister" className="text-[var(--text-primary)] font-semibold">
								Email
							</label>
							<input
								disabled={isLoading}
								type="email"
								name="email"
								id="emailRegister"
								value={form.email}
								required
								placeholder="Nhập email..."
								className="h-[40px] pl-2 placeholder:text-sm placeholder:text-[var(--text-primary)] rounded-md bg-[var(--primary-bg)] disabled:opacity-60 disabled:cursor-not-allowed"
								onChange={(e) => onChangeForm(e)}
							/>
							<label htmlFor="password" className="text-[var(--text-primary)] font-semibold">
								Password
							</label>
							<input
								disabled={isLoading}
								type="password"
								name="password"
								value={form.password}
								id="password"
								required
								placeholder="Mật khẩu..."
								className="h-[40px] pl-2 placeholder:text-sm placeholder:text-[var(--text-primary)] rounded-md bg-[var(--primary-bg)] disabled:opacity-60 disabled:cursor-not-allowed"
								onChange={(e) => onChangeForm(e)}
							/>
							<span className="text-red-500">{msgValidator.password}</span>
							<label htmlFor="passwordConfirm" className="text-[var(--text-primary)] font-semibold">
								Password Confirm
							</label>
							<input
								disabled={isLoading}
								type="password"
								name="passwordConfirm"
								id="passwordConfirm"
								value={form.passwordConfirm}
								required
								placeholder="Xác nhận mật khẩu"
								className="h-[40px] pl-2 placeholder:text-sm placeholder:text-[var(--text-primary)] rounded-md bg-[var(--primary-bg)] disabled:opacity-60 disabled:cursor-not-allowed"
								onChange={(e) => onChangeForm(e)}
							/>
							<span className="text-red-500">{msgValidator.passwordConfirm}</span>
						</>
					)}
					<span className="block text-center pt-4">
						{loginForm ? `Bạn không có tài khoản ?` : `Bạn đã có tài khoản ?`}
						<strong onClick={() => setLoginForm(!loginForm)} className="text-[var(--purple-primary)] ml-2">
							{loginForm ? `Đăng Kí` : `Đăng Nhập`}
						</strong>
					</span>
					<button
						type="submit"
						disabled={isLoading}
						className="text-white bg-[var(--purple-primary)] w-full py-2 mt-4 rounded-xl text-sm relative disabled:opacity-70 disabled:cursor-not-allowed">
						{isLoading && (
							<ClipLoader
								size={20}
								color="white"
								cssOverride={{
									position: "absolute",
									left: "38%",
								}}
							/>
						)}
						{loginForm ? `Đăng nhập` : `Đăng kí`}
					</button>
				</form>
			</div>
		</>
	);
}

export default FormModal;
