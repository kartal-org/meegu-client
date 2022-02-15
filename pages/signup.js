import React, { useState } from "react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

//validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import {
	Typography,
	Button,
	TextField,
	Dialog,
	Card,
	CardContent,
} from "@mui/material";

//icons
import { BsFillPersonFill } from "react-icons/bs";
import { IoMdMail } from "react-icons/io";
import { AiFillUnlock } from "react-icons/ai";

import researcher from "../components/img/researcher.png";

import DialogComponent from "../components/reusable/dialog";

export default function SignUp() {
	const router = useRouter();

	const [formData, setFormData] = useState({
		first_name: "",
		last_name: "",
		username: "",
		email: "",
		password: "",
		re_password: "",
	});

	//validation
	const validationMsg = Yup.object().shape({
		first_name: Yup.string().required("First name is required."),
		last_name: Yup.string().required("Last name is required."),
		username: Yup.string().required("Username is required."),
		email: Yup.string()
			.required("Your e-mail is required.")
			.email("Please put the correct e-mail format"),
		password: Yup.string()
			.required("Password is required.")
			.min(6, "Password must have atleast 6 characters."),
		re_password: Yup.string()
			.required("Confirm password is required.")
			.oneOf([Yup.ref("password"), null], "Confim password does not match"),
	});

	const {
		register, // register inputs
		handleSubmit, // handle form submit
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationMsg),
	});

	const onSubmit = (data) => {
		console.log(JSON.stringify(data, null, 2));
	};

	//dialog
	const [open, setOpen] = useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = (value) => {
		setOpen(false);
	};

	return (
		<>
			<NextSeo title="Sign Up" />

			<div class="flex flex-wrap w-full">
				<div class="flex flex-col w-full md:w-1/2">
					<div class="flex justify-center pt-12 md:justify-start md:pl-12 md:-mb-24">
						<button
							onClick={() => router.push("/")}
							class="p-4 text-xl font-bold text-white bg-purple-800"
						>
							meegu.
						</button>
					</div>

					<div class="mt-16 flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
						<p class="text-3xl text-center">Start your journey!</p>

						<form
							className="flex flex-col pt-3 md:pt-6 space-y-1 w-full"
							onSubmit={handleSubmit(onSubmit)}
						>
							{/* First Name */}
							<TextField
								variant="outlined"
								fullWidth
								name="first_name"
								placeholder="First Name"
								{...register("first_name")}
								error={errors.first_name ? true : false}
							/>
							<Typography
								sx={{ fontSize: "11px", color: "red", fontStyle: "italic" }}
							>
								{errors.first_name?.message}
							</Typography>

							{/* Last Name */}
							<TextField
								name="last_name"
								placeholder="Your Last Name"
								fullWidth
								variant="outlined"
								{...register("last_name")}
								error={errors.last_name ? true : false}
							/>
							<Typography
								sx={{ fontSize: "11px", color: "red", fontStyle: "italic" }}
							>
								{errors.last_name?.message}
							</Typography>

							{/* Username */}
							<TextField
								name="username"
								placeholder="Your Username"
								fullWidth
								variant="outlined"
								{...register("username")}
								error={errors.username ? true : false}
							/>
							<Typography
								sx={{ fontSize: "11px", color: "red", fontStyle: "italic" }}
							>
								{errors.username?.message}
							</Typography>

							{/* email */}
							<TextField
								name="email"
								placeholder="Your email"
								fullWidth
								variant="outlined"
								{...register("email")}
								error={errors.email ? true : false}
							/>
							<Typography
								sx={{ fontSize: "11px", color: "red", fontStyle: "italic" }}
							>
								{errors.email?.message}
							</Typography>

							{/* password */}
							<TextField
								name="password"
								placeholder="Your password"
								fullWidth
								variant="outlined"
								type="password"
								{...register("password")}
								error={errors.password ? true : false}
							/>
							<Typography
								sx={{ fontSize: "11px", color: "red", fontStyle: "italic" }}
							>
								{errors.password?.message}
							</Typography>

							{/* re_password */}
							<TextField
								name="re_password"
								placeholder="Re-enter your password"
								fullWidth
								variant="outlined"
								type="password"
								{...register("re_password")}
								error={errors.re_password ? true : false}
							/>
							<Typography
								sx={{ fontSize: "11px", color: "red", fontStyle: "italic" }}
							>
								{errors.re_password?.message}
							</Typography>

							<div className="flex justify-end">
								<DialogComponent
									maxWidth="sm"
									title="Select user type"
									button={
										<Button type="submit" variant="outlined">
											Sign Up
										</Button>
									}
								>
									<div className="px-5 flex flex-row justify-between">
										<Card
											sx={{
												maxWidth: 275,
												display: "flex",
												justifyContent: "center",
												p: 3,
												border: 1,
												borderColor: "#dedede",
												cursor: "pointer",
											}}
										>
											<div className="">
												<img
													alt=""
													className="w-24 h-24"
													// src="https://cdn-icons.flaticon.com/png/512/3153/premium/3153030.png?token=exp=1639492567~hmac=57e6f62984b49d73db3696bf8d8d4d22"
													src={researcher}
												/>
												<p className="mt-3 w-full text-center text-gray-500">
													Researcher
												</p>
											</div>
										</Card>

										<Card
											sx={{
												maxWidth: 275,
												display: "flex",
												justifyContent: "center",
												p: 3,
												border: 1,
												borderColor: "#dedede",
												cursor: "pointer",
											}}
										>
											<div className="">
												<img
													alt=""
													className="w-24 h-24"
													src="https://cdn-icons.flaticon.com/png/512/3152/premium/3152902.png?token=exp=1639492570~hmac=c1b6dc596e35eecb64cadf60e9e7ea5f"
												/>
												<p className="mt-3 w-full text-center text-gray-500">
													Adviser
												</p>
											</div>
										</Card>

										<Card
											sx={{
												maxWidth: 275,
												display: "flex",
												justifyContent: "center",
												p: 3,
												border: 1,
												borderColor: "#dedede",
												cursor: "pointer",
											}}
										>
											<div className="">
												<img
													alt=""
													className="w-24 h-24"
													src="https://cdn-icons.flaticon.com/png/512/3152/premium/3152908.png?token=exp=1639492568~hmac=35e2f59c0e7d9e4054c05b080ccefc04"
												/>
												<p className="mt-3 w-full text-center text-gray-500">
													Moderator
												</p>
											</div>
										</Card>
									</div>
								</DialogComponent>
							</div>
						</form>

						<div class="pt-2 pb-2 justify-start">
							<p>
								<button
									onClick={() => router.push("/login")}
									class="ml-2 text-gray-400 hover:text-purple-400"
								>
									Login
								</button>
							</p>
						</div>

						<div className="mt-9 flex flex-row justify-between mb-3">
							<div className="text-gray-500">Continue with: </div>

							<button
								// onClick={continueWithGoogle}
								type="button"
								className="text-purple-400  "
							>
								Google
							</button>
						</div>
					</div>
				</div>

				<div class="w-1/2 shadow-2xl">
					<img
						class="hidden object-center w-full h-screen md:block"
						src="https://images.unsplash.com/photo-1510007003972-ee92e9845bb7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fG1pbmltYWxpc3RpY3xlbnwwfDB8MHx8&auto=format&fit=crop&w=1500&q=600"
						alt="login"
					/>
				</div>
			</div>
		</>
	);
}
