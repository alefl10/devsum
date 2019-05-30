import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
	const errorState = { ...action.payload, ...action.inputField };
	switch (action.type) {
	case GET_ERRORS:
		return errorState;
	case CLEAR_ERRORS:
		return action.payload;
	default:
		return state;
	}
}
