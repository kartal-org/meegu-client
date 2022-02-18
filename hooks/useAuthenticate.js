import { useRouter } from 'next/router';
import { withAuth } from '../axios/axiosInstances';
import { useUserUpdate } from '../contexts/userProvider';

export function useAuthenticate() {
	const router = useRouter();
	const userUpdate = useUserUpdate();

	function authenticate() {
		withAuth
			.get('/users/me')
			.then((response) => {
				if (response.status == 200) {
					const user = response.data;
					userUpdate(user);
					const userType = user.type;

					switch (userType) {
						case 'researcher':
							router.push('/researcher');
							break;
						case 'adviser':
							router.push('/adviser');
							break;
						case 'moderator':
							router.push('/moderator');
							break;

						default:
							router.push('/register');
							break;
					}
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
	return authenticate;
}
