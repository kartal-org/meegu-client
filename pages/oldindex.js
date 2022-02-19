import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import Navbar from '../components/navbar';

export default function LandingPage() {
	const router = useRouter();
	return (
		<>
			<div class='flex flex-col'>
				<Navbar />
				<div class='mt-3'>
					<div
						class='bg-no-repeat bg-cover dark:bg-gray-800 flex relative z-20 items-center overflow-hidden -mt-3 h-screen '
						// style={{
						// 	backgroundImage: `url(${frame})`,
						// }}
					>
						<div class='container mx-auto px-6 flex relative py-16'>
							<div class='sm:w-2/3 lg:w-2/5 flex flex-col relative z-20'>
								<span class='w-20 h-2 bg-gray-800 dark:bg-white mb-12'></span>
								<h1 class='font-bebas-neue uppercase text-6xl sm:text-8xl font-black flex flex-col leading-none dark:text-white text-gray-800'>
									Be on
									<span class='text-5xl sm:text-7xl'>Time</span>
								</h1>

								<p class='text-sm sm:text-base text-gray-700 dark:text-white mt-4'>
									Dimension of reality that makes change possible and understandable. An
									indefinite and homogeneous environment in which natural events and human
									existence take place.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

// import Head from "next/head";
// import { signIn, signOut, useSession } from "next-auth/react";

// import { Button } from "@mui/material";

// const Home = () => {
// 	const { data: session, status } = useSession();

// 	if (status === "loading") {
// 		return (
// 			<>
// 				<h1>Loading ...</h1>
// 			</>
// 		);
// 	}

// 	if (session) {
// 		return (
// 			<>
// 				Signed in as {session.user?.email} <br />
// 				<Button variant="outlined" onClick={() => signOut()}>
// 					{" "}
// 					Sign Out
// 				</Button>
// 			</>
// 		);
// 	}

// 	return (
// 		<>
// 			Not signed in <br />
// 			<Button variant="outlined" onClick={() => signIn()}>
// 				{" "}
// 				Sign In
// 			</Button>
// 		</>
// 	);
// };

// export default Home;
