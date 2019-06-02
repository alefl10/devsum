/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfileAction } from '../../redux/actions/profileActions';

class CreateProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			displaySocialInputs: false,
			handle: '',
			company: '',
			website: '',
			location: '',
			status: '',
			skills: '',
			githubUsername: '',
			bio: '',
			twitter: '',
			facebook: '',
			linkedin: '',
			youtube: '',
			instagram: '',
			errors: {},
		};
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	onSubmit(e) {
		e.preventDefault();
		const { createProfile, history }	= this.props;
		// eslint-disable-next-line max-len
		const { handle, status, company, website, location, skills, githubUsername, bio, twitter, facebook, linkedin, youtube, instagram } = this.state;
		const profileData = {
			handle,
			company,
			website,
			location,
			status,
			skills,
			githubUsername,
			bio,
			twitter,
			facebook,
			linkedin,
			youtube,
			instagram,
		};
		createProfile(profileData, history);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		const {
			handle,
			errors,
			status,
			company, website,
			location,
			skills,
			githubUsername,
			bio,
			displaySocialInputs,
			twitter,
			facebook,
			linkedin,
			youtube,
			instagram,
		} = this.state;

		let socialInputs;

		if (displaySocialInputs) {
			socialInputs = (
				<div>
					<InputGroup
						placeholder="Twitter Profile URL"
						name="twitter"
						icon="fab fa-twitter"
						value={twitter}
						onChange={this.onChange}
						error={errors.twitter}
					/>
					<InputGroup
						placeholder="Facebook Profile URL"
						name="facebook"
						icon="fab fa-facebook"
						value={facebook}
						onChange={this.onChange}
						error={errors.facebook}
					/>
					<InputGroup
						placeholder="LinkedIn Profile URL"
						name="linkedin"
						icon="fab fa-linkedin"
						value={linkedin}
						onChange={this.onChange}
						error={errors.linkedin}
					/>
					<InputGroup
						placeholder="YouTube Profile URL"
						name="youtube"
						icon="fab fa-youtube"
						value={youtube}
						onChange={this.onChange}
						error={errors.youtube}
					/>
					<InputGroup
						placeholder="Instagram Profile URL"
						name="instagram"
						icon="fab fa-instagram"
						value={instagram}
						onChange={this.onChange}
						error={errors.instagram}
					/>
				</div>
			);
		}

		// Select Options for status
		const options = [
			{ label: '* Select Professional Status', value: 0 },
			{ label: 'Developer', value: 'Developer' },
			{ label: 'Junior Developer', value: 'Junior Developer' },
			{ label: 'Senior Developer', value: 'Senior Developer' },
			{ label: 'Manager', value: 'Manager' },
			{ label: 'Student or Learning', value: 'Student or Learning' },
			{ label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
			{ label: 'Intern', value: 'Intern' },
			{ label: 'Other', value: 'Other' },
		];

		return (
			<div className="create-profile">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Create Your Profile</h1>
							<p className="lead text-center">Let&#39;s get some informationto make your profile standout</p>
							<small className="d-block pb-3"><strong>*</strong> required field</small>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									placeholder="* Profile Handle"
									name="handle"
									value={handle}
									onChange={this.onChange}
									error={errors.handle}
									info="A unique handle fo your profile URL. Your fullname, company, name, nickname, etc."
								/>
								<SelectListGroup
									placeholder="Status"
									name="status"
									value={status}
									onChange={this.onChange}
									options={options}
									error={errors.status}
									info="Provide information about your current professional career status"
								/>
								<TextFieldGroup
									placeholder="Company"
									name="company"
									value={company}
									onChange={this.onChange}
									error={errors.company}
									info="Your company or one you work for"
								/>
								<TextFieldGroup
									placeholder="Website"
									name="website"
									value={website}
									onChange={this.onChange}
									error={errors.website}
									info="Portfolio, company, etc."
								/>
								<TextFieldGroup
									placeholder="Location"
									name="location"
									value={location}
									onChange={this.onChange}
									error={errors.location}
									info="City or city &amp; state suggested (eg. Boston, MA"
								/>
								<TextFieldGroup
									placeholder="* Skills"
									name="skills"
									value={skills}
									onChange={this.onChange}
									error={errors.skills}
									info="Please use comma-separated values (eg. HTML,CSS,JavaScript,Swift"
								/>
								<TextFieldGroup
									placeholder="GitHub Username"
									name="githubUsername"
									value={githubUsername}
									onChange={this.onChange}
									error={errors.githubUsername}
									info="Include your GitHub Username if your want to show your latest repos and GitHub link"
								/>
								<TextAreaFieldGroup
									placeholder="Short Bio"
									name="bio"
									value={bio}
									onChange={this.onChange}
									error={errors.bio}
									info="Tell us a little bit about yourself"
								/>
								<div className="mb-3">
									<button
										type="button"
										onClick={() => {
											this.setState(prevState => ({
												displaySocialInputs:
												!prevState.displaySocialInputs,
											}));
										}}
										className="btn btn-light mr-2"
									>
										Add Social Network Links
									</button>
									<span className="text-muted"><small><i>Optional</i></small></span>
								</div>
								{socialInputs}
								<input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

CreateProfile.propTypes = {
	profile: PropTypes.shape({}).isRequired,
	errors: PropTypes.shape({}).isRequired,
	createProfile: PropTypes.func.isRequired,
	history: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({ profile: state.profile, errors: state.errors });
const mapDispatchToProps = { createProfile: createProfileAction };

export default connect(mapStateToProps, mapDispatchToProps)(CreateProfile);
