/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addEducationAction } from '../../redux/actions/profileActions';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

class AddEducation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			school: '',
			degree: '',
			studyField: '',
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
		const { school, degree, studyField, from, to, current, description } = this.state;
		const educationData = { school, degree, studyField, from, to, current, description };
		const { addEducation, history } = this.props;
		addEducation(educationData, history);
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
		const { errors, school, degree, studyField, from, to, disabled, current, description } = this.state;

		return (
			<div className="add-education">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<Link to="/dashboard" className="btn btn-light text-primary">
								Go Back
							</Link>
							<h1 className="display-4 text-center">Add Education</h1>
							<p className="lead text-center">Add any school, bootcamp, etc. you may have attended</p>
							<small className="d-block pb-3"><strong>*</strong> required fields</small>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									placeholder="* School"
									name="school"
									value={school}
									onChange={this.onChange}
									error={errors.school}
								/>
								<TextFieldGroup
									placeholder="* Degree or Certification"
									name="degree"
									value={degree}
									onChange={this.onChange}
									error={errors.degree}
								/>
								<TextFieldGroup
									placeholder="* Field of Study"
									name="studyField"
									value={studyField}
									onChange={this.onChange}
									error={errors.studyField}
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
									<label htmlFor="current" className="form-check-label">Currently Pursuing</label>
								</div>
								<TextAreaFieldGroup
									placeholder="Program Description"
									name="description"
									value={description}
									onChange={this.onChange}
									error={errors.description}
									info="Tell us a about your the program you enrolled"
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

AddEducation.propTypes = {
	addEducation: PropTypes.func.isRequired,
	history: PropTypes.shape({}).isRequired,
	errors: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({ errors: state.errors });
const mapDispatchToProps = { addEducation: addEducationAction };

export default connect(mapStateToProps, mapDispatchToProps)(AddEducation);
