/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import React from 'react';
import classnames from 'classnames'; // Useful package for conditional HTML classes
import PropTypes from 'prop-types';

// eslint-disable-next-line max-len
const TextAreaFieldGroup = ({ name, placeholder, value, error, info, onChange }) => (
	<div className="form-group">
		<textarea
			className={classnames('form-control form-control-lg', { 'is-invalid': error })}
			placeholder={placeholder}
			name={name}
			value={value}
			onChange={onChange}
		/>
		{info && <small className="form-text text-muted">{info}</small>}
		{ error && (<div className="invalid-feedback">{error}</div>)}
	</div>
);

TextAreaFieldGroup.propTypes = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string,
	info: PropTypes.string,
	error: PropTypes.string,
	onChange: PropTypes.func.isRequired,
};

TextAreaFieldGroup.defaultProps = {
	value: undefined,
	placeholder: null,
	info: null,
	error: null,
};

export default TextAreaFieldGroup;
