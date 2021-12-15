import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './actions/api';

const initialState = {
	posts: [],
	currentPost: null,
	status: 'idle',
};

const postSlice = createSlice({
	name: 'post',
	initialState,
	reducers: {
		loadPostsRequest: (state, action) => {
			state.posts = [];
			state.status = 'loading';
		},
		loadPostsSuccess: (state, action) => {
			state.posts = action.payload;
			state.status = 'idle';
		},
		loadPostsFailed: (state, action) => {
			state.status = 'error';
		},
	},
});

export const { loadPostsRequest, loadPostsSuccess, loadPostsFailed } = postSlice.actions;
export default postSlice.reducer;

export const getPosts = () =>
	apiCallBegan({
		url: '/posts',
		method: 'get',
		// headers: {
		// 	Authorization: 'Bearer ' + localStorage.getItem('access_token'),
		// 	'Content-Type': 'application/json',
		// 	accept: 'application/json',
		// },
		// type: 'regular',
		onStart: loadPostsRequest.type,
		onSuccess: loadPostsSuccess.type,
		onError: loadPostsFailed.type,
	});
