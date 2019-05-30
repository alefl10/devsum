import Validator from 'validator';
import isEmpty from './is-empty';

export default function validateLoginInput(data) {
	const errors = {};
	let { text } = data;

	// Makes sure that the request fields are always treated as a string for further validation
	text = !isEmpty(text) ? text : '';

	if (Validator.isEmpty(text)) {
		errors.text = 'Text field is required';
	}


	return { errors, isValid: isEmpty(errors) };
}
