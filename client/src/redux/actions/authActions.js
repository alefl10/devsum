import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken';
import { SET_CURRENT_USER, GET_ERRORS, CLEAR_ERRORS } from './types';

export const setCurrentUserAction = decoded => (
	{ type: SET_CURRENT_USER, payload: decoded }
);

export const registerUserAction = (userData, history) => (dispatch) => {
	axios.post('api/users/register', userData)
		.then(() => {
			dispatch({ type: CLEAR_ERRORS, payload: {} });
			history.push('/login');
		})
		.catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const loginUserAction = userData => (dispatch) => {
	axios.post('/api/users/login', userData)
		.then((res) => {
			const { token } = res.data;

			// Save token to local storage - localStorage only stores strings
			// eslint-disable-next-line no-undef
			localStorage.setItem('jwtToken', token);

			// Set token to Auth header
			setAuthToken(token);

			// Decode token to get user data
			const decoded = jwtDecode(token);

			// Set current user
			dispatch(setCurrentUserAction(decoded));
			dispatch({ type: CLEAR_ERRORS, payload: {} });
		})
		.catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const logoutUserAction = () => (dispatch) => {
	// Remove token from localStorage
	// eslint-disable-next-line no-undef
	localStorage.removeItem('jwtToken');

	// Remove auth header for future requests
	setAuthToken(false);

	// Set current user to an empty object which will set isAuthenticated to false
	dispatch({ type: CLEAR_ERRORS, payload: {} });
	dispatch(setCurrentUserAction({}));
};
