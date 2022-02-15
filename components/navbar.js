import { useRouter } from "next/router";

import { Button } from "@mui/material";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
	const router = useRouter();
	return (
		<>
			<div>
				<nav class="dark:bg-gray-800 py-4 h-16 shadow-md">
					<div class="max-w-7xl mx-auto px-8">
						<div class="flex items-center justify-between h-7">
							<div class=" flex items-center">
								<h5 class="font-bold text-3xl text-purple-800 -mt-2">
									{" "}
									meegu.
								</h5>

								<div class="hidden md:block">
									<div class="ml-10 flex items-baseline space-x-4">
										<p class="text-gray-400  hover:text-purple-700 dark:hover:text-white px-3 py-2 rounded-md text-md">
											About
										</p>
										<p class="text-gray-400  hover:text-purple-700 dark:hover:text-white px-3 py-2 rounded-md text-md">
											Features
										</p>
										<p class="text-gray-400  hover:text-purple-700 dark:hover:text-white px-3 py-2 rounded-md text-md">
											Contact Us
										</p>
									</div>
								</div>
							</div>

							<div class="block">
								<div class="md:block -mr-2 flex">
									<form class="flex flex-col md:flex-row w-3/4 md:w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center">
										{/* <Button onClick={() => signIn()}>Sign in</Button> */}
										<Button
											onClick={() => router.push("/login")}
											variant="outlined"
										>
											Login
										</Button>
									</form>
								</div>

								<div class="ml-4 flex items-center md:ml-6"></div>
							</div>
						</div>
					</div>
				</nav>
			</div>
		</>
	);
}
