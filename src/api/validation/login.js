import Validator from 'validator';
import isEmpty from './is-empty';

export default function validateLoginInput(data) {
	const errors = {};
	let { email, password } = data;

	// Makes sure that the request fields are always treated as a string for further validation
	email = !isEmpty(email) ? email : '';
	password = !isEmpty(password) ? password : '';

	if (!Validator.isEmail(email)) {
		errors.email = 'Email is invalid';
	}

	if (Validator.isEmpty(email)) {
		errors.email = 'Email field is required';
	}

	if (Validator.isEmpty(password)) {
		errors.password = 'Password field is required';
	}


	return { errors, isValid: isEmpty(errors) };
}
