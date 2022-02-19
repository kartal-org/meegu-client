import { useRouter } from 'next/router';
import { genericReq, withAuth } from '../axios/axiosInstances';
import { useUserUpdate } from '../contexts/userProvider';

// this hook will send authentication and set userData.

export function useAuthenticate() {
	const router = useRouter();
	const userUpdate = useUserUpdate();

	const authenticate = async () => {
		let response;
		try {
			response = await genericReq('/users/me', 'get', 'withAuthMedia');
			if (response.status == 200) {
				const user = response.data;
				userUpdate(user);
			}
			if (response.status == 401) {
				// router.replace('/');
				console.log(error);
			}
		} catch (error) {
			console.log(error);
		}
		return response;
	};
	return authenticate;
}
