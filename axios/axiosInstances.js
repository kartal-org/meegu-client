import axios from 'axios';

const baseURL = process.env.BACKEND_API_UR;
const getAccessToken = () => {
	let access_token;

	if (process.browser) {
		access_token = localStorage.getItem('access_token');
	}
	console.log(access_token);
	return access_token;
};

export const withOutAuth = axios.create({
	baseURL,
	timeout: 5000,
	headers: { 'Content-Type': 'application/json' },
});

export const withAuth = axios.create({
	baseURL,
	timeout: 5000,
	headers: {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${getAccessToken()}`,
	},
});

export const withAuthMedia = axios.create({
	baseURL,
	timeout: 5000,
	headers: {
		Authorization: `Bearer ${getAccessToken()}`,
		'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
		accept: '*/*',
	},
});

export const genericReq = async (url, method, headerType, data) => {
	let headers;
	try {
		let response;

		switch (headerType) {
			case 'withAuth':
				headers = {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${getAccessToken()}`,
				};
				break;
			case 'withAuthMedia':
				headers = {
					Authorization: `Bearer ${getAccessToken()}`,
					'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
					accept: '*/*',
				};
				break;
			default:
				headers = { 'Content-Type': 'application/json' };
				break;
		}
		console.log(headers);
		console.log(data);
		response = await axios.request({
			baseURL,
			url,
			method,
			headers,
			data,
		});
		return response;
	} catch (error) {
		console.log(error);
	}
};
