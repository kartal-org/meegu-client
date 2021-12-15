import { combineReducers } from 'redux';
import postReducer from './postSlice';

export default combineReducers({
	post: postReducer,
});
