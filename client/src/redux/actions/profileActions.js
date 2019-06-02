/* eslint-disable no-alert */
import axios from 'axios';
import { SET_CURRENT_USER, GET_PROFILE, GET_PROFILES, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS, CLEAR_ERRORS } from './types';

// Profile loading
export const setProfileLoadingAction = () => ({ type: PROFILE_LOADING });

// Clear Profile
export const clearCurrentProfileAction = () => ({ type: CLEAR_CURRENT_PROFILE });

// Get current profile
export const getCurrentProfileAction = () => (dispatch) => {
	dispatch(setProfileLoadingAction());
	axios.get('/api/profile')
		.then((res) => {
			dispatch({ type: CLEAR_ERRORS, payload: {} });
			dispatch({ type: GET_PROFILE, payload: res.data });
		})
		// The payload being an empty object means that this user doesno have a profile
		.catch(() => dispatch({ type: GET_PROFILE, payload: {} }));
};

// Get Profile by Handle
export const getProfileByHandleAction = profileHandle => (dispatch) => {
	dispatch(setProfileLoadingAction());
	axios.get(`/api/profile/handle/${profileHandle}`)
		.then((res) => {
			dispatch({ type: CLEAR_ERRORS, payload: {} });
			dispatch({ type: GET_PROFILE, payload: res.data });
		})
		// The payload being an empty object means that this user doesno have a profile
		.catch(() => dispatch({ type: GET_PROFILE, payload: null }));
};

// Create new Profile
export const createProfileAction = (profileData, history) => (dispatch) => {
	axios.post('/api/profile', profileData)
		.then(() => {
			dispatch({ type: CLEAR_ERRORS, payload: {} });
			history.push('/dashboard');
		})
		.catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Add Experience
export const addExperienceAction = (experience, history) => (dispatch) => {
	axios.post('/api/profile/experience', experience)
		.then(() => {
			dispatch({ type: CLEAR_ERRORS, payload: {} });
			history.push('/dashboard');
		})
		.catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Delete Experience
export const deleteExperienceAction = expId => (dispatch) => {
	axios.delete(`/api/profile/experience/${expId}`)
		.then((res) => {
			dispatch({ type: CLEAR_ERRORS, payload: {} });
			dispatch({ type: GET_PROFILE, payload: res.data });
		})
		.catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Add Education
export const addEducationAction = (education, history) => (dispatch) => {
	axios.post('/api/profile/education', education)
		.then(() => {
			dispatch({ type: CLEAR_ERRORS, payload: {} });
			history.push('/dashboard');
		})
		.catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Delete Education
export const deleteEducationAction = eduId => (dispatch) => {
	axios.delete(`/api/profile/education/${eduId}`)
		.then((res) => {
			dispatch({ type: CLEAR_ERRORS, payload: {} });
			dispatch({ type: GET_PROFILE, payload: res.data });
		})
		.catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const getProfilesAction = () => (dispatch) => {
	dispatch(setProfileLoadingAction());
	axios.get('api/profile/all')
		.then((res) => {
			dispatch({ type: CLEAR_ERRORS, payload: {} });
			dispatch({ type: GET_PROFILES, payload: res.data });
		})
		.catch(() => dispatch({ type: GET_PROFILES, payload: null }));
};

// Delete Account & Profile
export const deleteAccountAction = () => (dispatch) => {
	// eslint-disable-next-line no-undef
	if (window.confirm('Do you really want to delete your account? This CANNOT undone!')) {
		axios.delete('/api/profile')
			// eslint-disable-next-line no-unused-vars
			.then(() => {
				dispatch({ type: CLEAR_ERRORS, payload: {} });
				dispatch({ type: SET_CURRENT_USER, payload: {} });
			})
			.catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
	}
};
