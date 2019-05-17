/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import React from 'react';
import classnames from 'classnames'; // Useful package for conditional HTML classes
import PropTypes from 'prop-types';

// eslint-disable-next-line max-len
const SelectListGroup = ({ name, value, error, info, onChange, options }) => {
	const selectOptions = options.map(option => (
		<option key={option.label} value={option.value}>
			{option.label}
		</option>
	));
	return (
		<div className="form-group">
			<select
				className={classnames('form-control form-control-lg', { 'is-invalid': error })}
				name={name}
				value={value}
				onChange={onChange}
			>
				{selectOptions}
			</select>
			{info && <small className="form-text text-muted">{info}</small>}
			{error && <div className="invalid-feedback">{error}</div>}
		</div>
	);
};

SelectListGroup.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	info: PropTypes.string,
	error: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	options: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
};

SelectListGroup.defaultProps = {
	info: null,
	error: null,
};

export default SelectListGroup;
