import '../styles/globals.css';
import { ThemeProvider } from '@mui/material/styles';
import { outsideTheme } from '../themes/theme';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { DefaultSeo } from 'next-seo';
import { UserProvider } from '../contexts/userProvider';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	const router = useRouter();
	const [open, setOpen] = useState(false);

	const Layout = Component.Layout || EmptyLayout;

	useEffect(() => {
		router.events.on('routeChangeStart', () => {
			setOpen(true);
		});
		router.events.on('routeChangeComplete', () => {
			setOpen(false);
		});
		router.events.on('routeChangeError', () => {
			setOpen(false);
		});
	}, []);
	return (
		<>
			<Head>
				<title>Meegu</title>
				<link
					rel='stylesheet'
					href='https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css'
				/>
				<link rel='stylesheet' href='https://unpkg.com/open-props' />
			</Head>
			<DefaultSeo titleTemplate='%s | Meegu' defaultTitle='Meegu' />
			<ThemeProvider theme={outsideTheme}>
				<UserProvider>
					<Layout>
						<Component {...pageProps} />
					</Layout>
					<Backdrop
						sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
						open={open}
					>
						<CircularProgress color='inherit' />
					</Backdrop>
				</UserProvider>
			</ThemeProvider>
		</>
	);
}

const EmptyLayout = ({ children }) => <>{children}</>;

export default MyApp;
