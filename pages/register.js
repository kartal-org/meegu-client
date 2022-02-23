import { NextSeo } from 'next-seo';
import { useUser, useUserUpdate } from '../contexts/userProvider';
import { withAuthMedia, genericReq } from '../axios/axiosInstances';
import AuthLayout from '../layouts/authLayout';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

// This page will edit the user type of the new authenticated user.

function Register() {
	const user = useUser();
	const userUpdate = useUserUpdate();
	const router = useRouter();

	const userTypes = [
		{
			id: 1,
			user: 'Researcher',
			img: (
				<>
					<img src='https://cdn-icons.flaticon.com/png/128/3153/premium/3153024.png?token=exp=1645165396~hmac=1051abdc078cbadfe20b94aa3e7dc0d0' />
				</>
			),
		},
		{
			id: 2,
			user: 'Adviser',
			img: (
				<>
					<img src='https://cdn-icons.flaticon.com/png/512/3152/premium/3152908.png?token=exp=1645165417~hmac=71134b9dde204cc301ce379033a29c9b' />
				</>
			),
		},
		{
			id: 3,
			user: 'Moderator',
			img: (
				<>
					<img src='https://cdn-icons.flaticon.com/png/128/3152/premium/3152902.png?token=exp=1645165417~hmac=92f75c75295fd377768660d5dbbc8375' />
				</>
			),
		},
	];

	// console.log(user);

	const handleRegister = async (type) => {
		console.log(type == 'researcher');
		var data = new FormData();
		data.append('type', type);
		const response = await fetch(process.env.BACKEND_APIUR + `/users/${user.id}/`, {
			method: 'PATCH',
			headers: {
				Authorization: `Bearer ${Cookies.get('access_token')}`,
			},
			body: data,
		});
		const result = await response.json();
		// const response = await genericReq(`/users/${user.id}/`, 'patch', 'withAuthMedia', data);
		console.log(result);
		const userType = result.data.type;
		switch (userType) {
			case 'researcher':
				router.push(`/workspaces?user=${user.id}`);
				break;
			case 'adviser':
				router.push(`/classrooms?user=${user.id}`);
				break;
			case 'moderator':
				router.push(`/institutions?user=${user.id}`);
				break;

			default:
				break;
		}
	};

	return (
		<>
			<NextSeo title='Check User' />
			<div className='h-screen p-5 flex flex-col items-center justify-center'>
				<p className='text-4xl text-center font-bold text-gray-500'>
					What type of user are you ?
				</p>

				<div className='mainParent'>
					{userTypes.map((item) => (
						<div
							key={item.id}
							className='userCard'
							onClick={() => handleRegister(item.user.toLowerCase())}
						>
							<div className='userCardImg'>{item.img}</div>
							<p className='text-center mt-5'>{item.user}</p>
						</div>
					))}
				</div>
			</div>
		</>
	);
}

Register.Layout = AuthLayout;

export default Register;
