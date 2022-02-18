import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser, useUserUpdate } from '../contexts/userProvider';
import WithAuth from '../axios/authenticatedInstance';
import { useAuthenticate } from '../hooks/useAuthenticate';

function AuthLayout({ children }) {
	const router = useRouter();
	const user = useUser();
	const location = router.pathname;
	const authenticate = useAuthenticate();

	useEffect(() => {
		console.log('location has changed');
		if (process.browser) {
			const access_token = localStorage.getItem('access_token');
			const refresh_token = localStorage.getItem('refresh_token');
			if (!access_token || !refresh_token) {
				router.push('/login');
			}
		}
		authenticate();
	}, [location]);

	return <>{children}</>;
}

export default AuthLayout;