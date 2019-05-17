import axios from 'axios';
import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from './types';

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
