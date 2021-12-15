import axios from 'axios';
import * as actions from '../actions/api';

const api =
	({ dispatch }) =>
	(next) =>
	async (action) => {
		if (action.type !== actions.apiCallBegan.type) return next(action);

		const { url, method, headers, data, onSuccess, onError, onStart } = action.payload;

		if (onStart) dispatch({ type: onStart });

		try {
			let response;
			response = await axios.request({
				baseURL: 'https://jsonplaceholder.typicode.com',
				url,
				headers,
				method,
				data,
			});

			if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
		} catch (error) {
			if (onError) dispatch({ type: onError, payload: error.message });
		}
	};

export default api;
