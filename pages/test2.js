import React from 'react';
import AuthLayout from '../layouts/authLayout';
import { useRouter } from 'next/router';
function test2() {
	const router = useRouter();
	const redirect = () => {
		router.push('/test');
	};
	return <button onClick={redirect}>Go Back</button>;
}

test2.Layout = AuthLayout;
export default test2;
