/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

class AddExperience extends Component {
	constructor(props) {
		super(props);
		this.state = {
			company: '',
			title: '',
			location: '',
			from: '',
			to: '',
			current: false,
			description: '',
			errors: {},
			disabled: false,
		};
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onCheck = this.onCheck.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	onSubmit(e) {
		e.preventDefault();
		const { company, title, location, from, to, current, description } = this.state;
		const experienceData = { company, title, location, from, to, current, description };
		const { addExperience, history } = this.props;
		addExperience(experienceData, history);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onCheck() {
		const { disabled, current } = this.state;
		this.setState({
			disabled: !disabled,
			current: !current,
		});
	}

	render() {
		// eslint-disable-next-line max-len
		const { errors, company, title, location, from, to, disabled, current, description } = this.state;

		return (
			<div className="add-experience">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<Link to="/dashboard" className="btn btn-light text-primary">
								Go Back
							</Link>
							<h1 className="display-4 text-center">Add experience</h1>
							<p className="lead text-center">Add any job or position that you have had in the past or current</p>
							<small className="d-block pb-3"><strong>*</strong> required fields</small>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									placeholder="* Company"
									name="company"
									value={company}
									onChange={this.onChange}
									error={errors.company}
								/>
								<TextFieldGroup
									placeholder="* Job Title"
									name="title"
									value={title}
									onChange={this.onChange}
									error={errors.title}
								/>
								<TextFieldGroup
									placeholder="Location"
									name="location"
									value={location}
									onChange={this.onChange}
									error={errors.location}
								/>
								<h6>From Date</h6>
								<TextFieldGroup
									name="from"
									type="date"
									value={from}
									onChange={this.onChange}
									error={errors.from}
								/>
								<h6>To Date</h6>
								<TextFieldGroup
									name="to"
									type="date"
									value={to}
									onChange={this.onChange}
									error={errors.to}
									disabled={disabled ? 'disabled' : ''}
								/>
								<div className="form-check mb-4">
									<input
										type="checkbox"
										className="form-check-input"
										name="current"
										value={current}
										checked={current}
										onChange={this.onCheck}
										id="current"
									/>
									<label htmlFor="current" className="form-check-label">Current Job</label>
								</div>
								<TextAreaFieldGroup
									placeholder="Job Description"
									name="description"
									value={description}
									onChange={this.onChange}
									error={errors.description}
									info="Tell us a about your job position"
								/>
								<input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

AddExperience.propTypes = {
	addExperience: PropTypes.func.isRequired,
	history: PropTypes.shape({}).isRequired,
	errors: PropTypes.shape({}).isRequired,
};

export default AddExperience;
