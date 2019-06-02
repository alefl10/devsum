import axios from 'axios';
import { ADD_POST, GET_ERRORS, CLEAR_ERRORS, GET_POST, GET_POSTS, POST_LOADING, DELETE_POST } from './types';

// Set Post Loading
export const setPostLoadingAction = () => ({ type: POST_LOADING });

// Get Posts
export const getPostsAction = () => (dispatch) => {
	dispatch(setPostLoadingAction());
	axios.get('/api/posts')
		.then((res) => {
			dispatch({ type: CLEAR_ERRORS, payload: {} });
			dispatch({ type: GET_POSTS, payload: res.data });
		})
		.catch(() => dispatch({ type: GET_POSTS, payload: null }));
};

// Get Post
export const getPostAction = postId => (dispatch) => {
	dispatch(setPostLoadingAction());
	axios.get(`/api/posts/${postId}`)
		.then((res) => {
			dispatch({ type: CLEAR_ERRORS, payload: {} });
			dispatch({ type: GET_POST, payload: res.data });
		})
		.catch(() => dispatch({ type: GET_POSTS, payload: null }));
};

// Add Post
export const addPostAction = postData => (dispatch) => {
	axios.post('/api/posts', postData)
		.then((res) => {
			dispatch({ type: CLEAR_ERRORS, payload: {} });
			dispatch({ type: ADD_POST, payload: res.data });
		})
		.catch(err => dispatch({
			type: GET_ERRORS,
			payload: err.response.data,
			inputField: { inputField: postData.text },
		}));
};

// Delete Post
export const deletePostAction = id => (dispatch) => {
	axios.delete(`/api/posts/${id}`)
		.then(() => {
			dispatch({ type: CLEAR_ERRORS, payload: {} });
			dispatch({ type: DELETE_POST, payload: id });
		})
		.catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Like Post
export const likeUnlikeAction = id => (dispatch) => {
	axios.post(`/api/posts/like/${id}`)
		.then(() => dispatch(getPostsAction()))
		.catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Add Post
export const addCommentAction = (postId, comment) => (dispatch) => {
	axios.post(`/api/posts/comment/${postId}`, comment)
		.then((res) => {
			dispatch({ type: CLEAR_ERRORS, payload: {} });
			dispatch({ type: GET_POST, payload: res.data });
		})
		.catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Delete Commment
export const deleteCommentAction = (postId, commentId) => (dispatch) => {
	console.log(commentId);
	axios.delete(`/api/posts/comment/${postId}/${commentId}`)
		.then((res) => {
			dispatch({ type: CLEAR_ERRORS, payload: {} });
			dispatch({ type: GET_POST, payload: res.data });
		})
		.catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};
