/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import React from 'react';
import classnames from 'classnames'; // Useful package for conditional HTML classes
import PropTypes from 'prop-types';

// eslint-disable-next-line max-len
const InputGroup = ({ name, placeholder, value, icon, type, error, onChange }) => (
	<div className="input-group mb-3">
		<div className="input-group-prepend">
			<span className="input-group-text">
				<i className={icon} />
			</span>
		</div>
		<input
			className={classnames('form-control form-control-lg', { 'is-invalid': error })}
			placeholder={placeholder}
			name={name}
			type={type}
			value={value}
			onChange={onChange}
		/>
		{ error && (<div className="invalid-feedback">{error}</div>)}
	</div>
);

InputGroup.propTypes = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string,
	type: PropTypes.string,
	icon: PropTypes.string.isRequired,
	error: PropTypes.string,
	onChange: PropTypes.func.isRequired,
};

InputGroup.defaultProps = {
	type: 'text',
	value: undefined,
	placeholder: null,
	error: null,
};

export default InputGroup;
