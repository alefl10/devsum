/* eslint-disable no-alert */
import axios from 'axios';
import { SET_CURRENT_USER, GET_PROFILE, GET_PROFILES, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS } from './types';

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

// Get Profile by Handle
export const getProfileByHandle = profileHandle => (dispatch) => {
	dispatch(setProfileLoading());
	axios.get(`/api/profile/handle/${profileHandle}`)
		.then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
		// The payload being an empty object means that this user doesno have a profile
		.catch(() => dispatch({ type: GET_PROFILE, payload: null }));
};

// Create new Profile
export const createProfile = (profileData, history) => (dispatch) => {
	axios.post('/api/profile', profileData)
		// eslint-disable-next-line no-unused-vars
		.then(res => history.push('/dashboard'))
		.catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Add Experience
export const addExperience = (experience, history) => (dispatch) => {
	axios.post('/api/profile/experience', experience)
		.then(() => history.push('/dashboard'))
		.catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Delete Experience
export const deleteExperience = expId => (dispatch) => {
	axios.delete(`/api/profile/experience/${expId}`)
		.then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
		.catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Add Education
export const addEducation = (education, history) => (dispatch) => {
	axios.post('/api/profile/education', education)
		.then(() => history.push('/dashboard'))
		.catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Delete Education
export const deleteEducation = eduId => (dispatch) => {
	axios.delete(`/api/profile/education/${eduId}`)
		.then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
		.catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const getProfiles = () => (dispatch) => {
	dispatch(setProfileLoading());
	axios.get('api/profile/all')
		.then(res => dispatch({ type: GET_PROFILES, payload: res.data }))
		.catch(() => dispatch({ type: GET_PROFILES, payload: null }));
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
