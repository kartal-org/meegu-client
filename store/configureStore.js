import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducers';
import api from './middleware/api';
import { createWrapper } from 'next-redux-wrapper';

const makeStore = () =>
	configureStore({
		reducer,
		middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api),
	});

export const wrapper = createWrapper(makeStore);
