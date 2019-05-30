import axios from 'axios';
import { ADD_POST, GET_ERRORS, GET_POST, GET_POSTS, POST_LOADING, DELETE_POST } from './types';

// Set Post Loading
export const setPostLoading = () => ({ type: POST_LOADING });

// Get Posts
export const getPosts = () => (dispatch) => {
	dispatch(setPostLoading());
	axios.get('/api/posts')
		.then((res) => {
			dispatch({ type: GET_POSTS, payload: res.data });
		})
		.catch(() => dispatch({ type: GET_POSTS, payload: null }));
};

// Get Post
export const getPost = postId => (dispatch) => {
	dispatch(setPostLoading());
	axios.get(`/api/posts/${postId}`)
		.then((res) => {
			dispatch({ type: GET_POST, payload: res.data });
		})
		.catch(() => dispatch({ type: GET_POSTS, payload: null }));
};

// Add Post
export const addPost = postData => (dispatch) => {
	axios.post('/api/posts', postData)
		.then((res) => {
			dispatch({ type: ADD_POST, payload: res.data });
		})
		.catch(err => dispatch({
			type: GET_ERRORS,
			payload: err.response.data,
			inputField: { inputField: postData.text },
		}));
};

// Delete Post
export const deletePost = id => (dispatch) => {
	axios.delete(`/api/posts/${id}`)
		.then(() => {
			dispatch({ type: DELETE_POST, payload: id });
		})
		.catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Like Post
export const likeUnlike = id => (dispatch) => {
	axios.post(`/api/posts/like/${id}`)
		.then(() => dispatch(getPosts()))
		.catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Add Post
export const addComment = (postId, comment) => (dispatch) => {
	axios.post(`/api/posts/comment/${postId}`, comment)
		.then((res) => {
			dispatch({ type: GET_POST, payload: res.data });
		})
		.catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Delete Commment
export const deleteComment = (postId, commentId) => (dispatch) => {
	console.log(commentId);
	axios.delete(`/api/posts/comment/${postId}/${commentId}`)
		.then((res) => {
			dispatch({ type: GET_POST, payload: res.data });
		})
		.catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};
