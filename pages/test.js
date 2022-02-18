import React from 'react';
import { useRouter } from 'next/router';
import { useUser } from '../contexts/userProvider';
import AuthLayout from '../layouts/authLayout';

function test() {
	const user = useUser();
	const router = useRouter();
	// console.log(user);
	// if (user) {
	// 	if (!user.type) {
	// 		return <div>Aha you are a new user</div>;
	// 	}
	// 	return <div>{user.first_name}</div>;
	// }
	const redirect = () => {
		router.push('/test2');
	};
	return (
		<>
			<button onClick={redirect}>Click me</button>
		</>
	);
}

test.Layout = AuthLayout;

export default test;
