import Validator from 'validator';
import isEmpty from './is-empty';

export default function validateExperienceInput(data) {
	const errors = {};
	let {
		school,
		degree,
		from,
		studyField,
	} = data;

	// Makes sure that the request fields are always treated as a string for further validation
	school = !isEmpty(school) ? school : '';
	degree = !isEmpty(degree) ? degree : '';
	studyField = !isEmpty(studyField) ? studyField : '';
	from = !isEmpty(from) ? from : '';

	if (Validator.isEmpty(school)) {
		errors.school = 'School field is required';
	}

	if (Validator.isEmpty(degree)) {
		errors.degree = 'Degree field is required';
	}

	if (Validator.isEmpty(from)) {
		errors.from = 'From date field is required';
	}

	if (Validator.isEmpty(studyField)) {
		errors.studyField = 'Study Field field is required';
	}

	return { errors, isValid: isEmpty(errors) };
}
