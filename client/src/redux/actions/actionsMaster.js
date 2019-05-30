import * as authActions from './authActions';
import * as profileActions from './profileActions';
import * as postActions from './postActions';
import { CLEAR_ERRORS } from './types';

export const clearErrors = () => (
	{ type: CLEAR_ERRORS, payload: {} }
);

const actions = { ...authActions, ...profileActions, ...postActions, clearErrors };

export default actions;
