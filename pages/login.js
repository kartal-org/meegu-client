import React, { useState } from "react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

//validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { Typography, Button, TextField } from "@mui/material";

export default function Login() {
	const router = useRouter();

	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	//validation
	const validationMsg = Yup.object().shape({
		email: Yup.string()
			.required("Your e-mail is required.")
			.email("Please put the correct e-mail format"),
		password: Yup.string().required("Password is required."),
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
		// dispatch(login(data.email, data.password));
	};

	return (
		<>
			<NextSeo title="Login" />
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

					<div class="mt-28 flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
						<p class="text-3xl text-center">Welcome back!</p>

						<form
							className="flex flex-col pt-3 md:pt-8 space-y-2 w-full"
							onSubmit={handleSubmit(onSubmit)}
						>
							<TextField
								variant="outlined"
								fullWidth
								name="email"
								placeholder="Your email"
								type="email"
								{...register("email")}
								error={errors.email ? true : false}
							/>

							<Typography
								sx={{ fontSize: "12px", color: "red", fontStyle: "italic" }}
							>
								{errors.email?.message}
							</Typography>

							<TextField
								variant="outlined"
								fullWidth
								name="password"
								placeholder="Your password"
								type="password"
								{...register("password")}
								error={errors.password ? true : false}
							/>

							<Typography
								sx={{ fontSize: "12px", color: "red", fontStyle: "italic" }}
							>
								{errors.password?.message}
							</Typography>

							<div className="flex flex-row items-center justify-between">
								<div class="pt-12 pb-12 text-center justify-start">
									<p>
										<button
											onClick={() => router.push("/signup")}
											className="text-base ml-2 text-gray-400 hover:text-purple-400"
										>
											Register
										</button>
									</p>
								</div>

								<div class="pt-12 pb-12 text-center justify-start">
									<p>
										<button
											onClick={() => router.push("/reset-password")}
											class="-ml-8 text-gray-400 hover:text-purple-400"
										>
											Forgot your password?
										</button>
									</p>
								</div>

								<div>
									{/* <Button onClick={() => signIn()}>Sign in</Button> */}
									<Button type="submit" variant="outlined">
										Login
									</Button>
								</div>
							</div>
						</form>

						<div className="flex flex-row justify-between mb-12 mt-48">
							<div className="text-gray-500">Continue with: </div>

							<div class="flex flex-row space-x-6 pr-10">
								<div>
									<p className="text-purple-400">Facebook</p>
									{/* <FacebookLogin
										appId='564451954655803'
										autoLoad={false}
										fields='name,email,picture'
										callback={responseFacebook}
										render={(renderProps) => (
											<button onClick={renderProps.onClick} className='text-purple-400'>
												Facebook
											</button>
										)}
									/> */}
								</div>
								<div>
									<p className="text-purple-400">Google</p>
									{/* <GoogleLogin
										clientId='1090422806656-3gpck8pb13jj38c9bp25pmuqe6scgsb1.apps.googleusercontent.com'
										render={(renderProps) => (
											<button
												onClick={renderProps.onClick}
												disabled={renderProps.disabled}
												className='text-purple-400'
											>
												Google
											</button>
										)}
										onSuccess={(e) => responseGoogle(e)}
										onFailure={(e) => responseGoogle(e)}
									/> */}
								</div>
							</div>
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

// import { providers, signIn, getSession, csrfToken } from "next-auth/react";
// import { createContext } from "react";

// function Login({ providers }) {
// 	return (
// 		<div>
// 			{Object.values(providers).map((provider) => {
// 				return (
// 					<div key={provider.name}>
// 						<button onClick={() => signIn(provider.id)}>
// 							Sign in with {provider.name}
// 						</button>
// 					</div>
// 				);
// 			})}
// 		</div>
// 	);
// }

// export default Login;

// export async function getServerSideProps(context) {
// 	return {
// 		props: {
// 			providers: await providers(context),
// 		},
// 	};
// }
