import Validator from 'validator';
import isEmpty from './is-empty';

export default function validateProfileInput(data) {
	const errors = {};
	let { handle, status, skills } = data;
	const {
		website,
		youtube,
		facebook,
		twitter,
		instagram,
		linkedin,
	} = data;

	// Makes sure that the request fields are always treated as a string for further validation
	handle = !isEmpty(handle) ? handle : '';
	status = !isEmpty(status) ? status : '';
	skills = !isEmpty(skills) ? skills : '';

	if (!Validator.isLength(handle, { min: 2, max: 40 })) {
		errors.handle = 'Handle needs to be between 2 and 40 characters';
	}

	if (Validator.isEmpty(handle)) {
		errors.handle = 'Profile handle is required';
	}

	if (Validator.isEmpty(status)) {
		console.log('Hello!');
		errors.status = 'Status field is required';
	}

	if (Validator.isEmpty(skills)) {
		errors.skills = 'Skills field is required';
	}

	if (!isEmpty(website)) {
		if (!Validator.isURL(website)) {
			errors.website = 'Not a valid URL';
		}
	}

	if (!isEmpty(youtube)) {
		if (!Validator.isURL(youtube)) {
			errors.youtube = 'Not a valid URL';
		}
	}

	if (!isEmpty(twitter)) {
		if (!Validator.isURL(twitter)) {
			errors.twitter = 'Not a valid URL';
		}
	}

	if (!isEmpty(facebook)) {
		if (!Validator.isURL(facebook)) {
			errors.facebook = 'Not a valid URL';
		}
	}

	if (!isEmpty(linkedin)) {
		if (!Validator.isURL(linkedin)) {
			errors.linkedin = 'Not a valid URL';
		}
	}

	if (!isEmpty(instagram)) {
		if (!Validator.isURL(instagram)) {
			errors.instagram = 'Not a valid URL';
		}
	}

	return { errors, isValid: isEmpty(errors) };
}
