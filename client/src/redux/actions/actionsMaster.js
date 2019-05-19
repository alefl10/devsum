import * as authActions from './authActions';
import * as profileActions from './profileActions';
import { CLEAR_ERRORS } from './types';

export const clearErrors = () => (
	{ type: CLEAR_ERRORS, payload: {} }
);

const actions = { ...authActions, ...profileActions, clearErrors };

export default actions;
