/* eslint-disable no-alert */
import axios from 'axios';
import { SET_CURRENT_USER, GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS } from './types';

// Profile loading
export const setProfileLoading = () => ({ type: PROFILE_LOADING });

// Clear Profile
export const clearCurrentProfile = () => ({ type: CLEAR_CURRENT_PROFILE });

// Get current profile
export const getCurrentProfile = () => (dispatch) => {
	dispatch(setProfileLoading());
	axios.get('/api/profile')
		.then(res => dispatch({ type: GET_PROFILE, payload: res.data }))

		// The payload being an empty object means that this user doesno have a profile
		.catch(() => dispatch({ type: GET_PROFILE, payload: {} }));
};

// Create new Profile
export const createProfile = (profileData, history) => (dispatch) => {
	axios.post('/api/profile', profileData)
		// eslint-disable-next-line no-unused-vars
		.then(res => history.push('/dashboard'))
		.catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Delete Account & Profile
export const deleteAccount = () => (dispatch) => {
	// eslint-disable-next-line no-undef
	if (window.confirm('Do you really want to delete your account? This CANNOT undone!')) {
		axios.delete('/api/profile')
			// eslint-disable-next-line no-unused-vars
			.then(res => dispatch({ type: SET_CURRENT_USER, payload: {} }))
			.catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
	}
};
