import Link from 'next/link';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { createRequest } from '../axios/axiosInstances';
import styles from '../styles/landing.module.scss';
import { useAuthenticate } from '../hooks/useAuthenticate';
import { useEffect } from 'react';
import useCheckUser from '../hooks/useCheckUser';
import Cookies from 'js-cookie';

// Serves 3 purpose landing page, login page, sign up page.

export default function LandingPage() {
	const authenticate = useAuthenticate();
	const checkUser = useCheckUser();

	// check if the user is already logged in

	useEffect(() => {
		const access_token = Cookies.get('access_token');
		const refresh_token = Cookies.get('refresh_token');

		if (access_token && refresh_token) {
			authenticate();
		}
	}, []);

	checkUser();

	const responseGoogle = async (response) => {
		let res;
		try {
			res = await createRequest(
				'/auth/convert-token',
				'post',
				{ 'Content-Type': 'application/json' },
				{
					grant_type: 'convert_token',
					client_id: process.env.BACKEND_APP_KEY,
					client_secret: process.env.BACKEND_APP_SECRET,
					backend: 'google-oauth2',
					token: response.accessToken,
				}
			);
			Cookies.set('access_token', res.data.access_token, { expires: 7 });
			Cookies.set('refresh_token', res.data.refresh_token, { expires: 7 });
		} catch (error) {
			console.log(error);
		}
	};
	const responseFacebook = (response) => {
		console.log(response);
	};
	return (
		<div className={styles.parentContainer}>
			<header className={`${styles.wrapper} ${styles.header}`}>
				<Link href='/'>
					<a>meegu</a>
				</Link>
			</header>
			<main className={`${styles.wrapper} ${styles.main}`}>
				<section className={styles.hero}>
					<div>
						<h1 className={styles.hero__heading}>Level Up Your Research Experience</h1>
						<p className={styles.hero__text}>
							Meegu is a online platform that helps you make your research journey easier and
							more meaningful by connecting you to all actors of research so you can have a
							much easier and more meaningful in a system that works!
						</p>
					</div>
					<div className={styles.action}>
						<div>
							<FacebookLogin
								appId={process.env.FACEBOOK_CLIENT_ID}
								autoLoad={false}
								callback={responseFacebook}
								render={(renderProps) => (
									<button
										onClick={renderProps.onClick}
										className={`${styles.action__btn} ${styles.facebook}`}
									>
										Continue with Facebook
									</button>
								)}
							/>
						</div>
						<div>
							<GoogleLogin
								clientId={process.env.GOOGLE_CLIENT_ID}
								render={(renderProps) => (
									<button
										onClick={renderProps.onClick}
										disabled={renderProps.disabled}
										className={`${styles.action__btn} ${styles.google}`}
									>
										Continue with Google
									</button>
								)}
								onSuccess={(e) => responseGoogle(e)}
								onFailure={(e) => responseGoogle(e)}
							/>
						</div>
					</div>
				</section>
			</main>
			<footer className={`${styles.footer}`}>
				<Link href='/'>
					<a className={styles.footer__logo}>meegu</a>
				</Link>
				<p className={styles.footer__text}>For easier and more meaningful research journey.</p>
			</footer>
		</div>
	);
}
