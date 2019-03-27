import Validator from 'validator';
import isEmpty from './is-empty';

export default function validateExperienceInput(data) {
	const errors = {};
	let { title, company, from } = data;

	// Makes sure that the request fields are always treated as a string for further validation
	title = !isEmpty(title) ? title : '';
	company = !isEmpty(company) ? company : '';
	from = !isEmpty(from) ? from : '';

	if (Validator.isEmpty(title)) {
		errors.title = 'Job title field is required';
	}

	if (Validator.isEmpty(company)) {
		errors.company = 'Company field is required';
	}

	if (Validator.isEmpty(from)) {
		errors.from = 'From date field is required';
	}

	return { errors, isValid: isEmpty(errors) };
}
