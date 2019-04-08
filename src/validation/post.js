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

	if (!Validator.isLength(text, { min: 10, max: 300 })) {
		errors.text = 'Post must be between 10 and 300 characters';
	}

	return { errors, isValid: isEmpty(errors) };
}
