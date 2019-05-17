import * as authActions from './authActions';
import * as profileActions from './profileActions';

const actions = { ...authActions, ...profileActions };

export default actions;
