/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import React from 'react';
import classnames from 'classnames'; // Useful package for conditional HTML classes
import PropTypes from 'prop-types';

// eslint-disable-next-line max-len
const TextFieldGroup = ({ name, placeholder, value, error, info, type, onChange, disabled }) => (
	<div className="form-group">
		<input
			type={type}
			className={classnames('form-control form-control-lg', { 'is-invalid': error })}
			placeholder={placeholder}
			name={name}
			value={value}
			onChange={onChange}
			disabled={disabled}
		/>
		{info && <small className="form-text text-muted">{info}</small>}
		{ error && (<div className="invalid-feedback">{error}</div>)}
	</div>
);

TextFieldGroup.propTypes = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	info: PropTypes.string,
	error: PropTypes.string,
	type: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	disabled: PropTypes.string,
};

TextFieldGroup.defaultProps = {
	type: 'text',
	placeholder: null,
	info: null,
	error: null,
	disabled: null,
};

export default TextFieldGroup;
