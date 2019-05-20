/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import isEmpty from '../../validation/is-empty';

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

	componentDidMount() {
		const { getCurrentProfile } = this.props;
		getCurrentProfile();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}

		if (nextProps.profile.profile) {
			const { profile } = nextProps.profile;
			const { handle, skills, status } = profile;
			let { company, website, location, githubUsername, bio, social } = profile;
			// Turn skills array into CSV values
			const skillsCSV = skills.join(',');

			// Check non-mandatory fields
			company = isEmpty(company) ? '' : company;
			website = isEmpty(website) ? '' : website;
			location = isEmpty(location) ? '' : location;
			githubUsername = isEmpty(githubUsername) ? '' : githubUsername;
			bio = isEmpty(bio) ? '' : bio;
			social = isEmpty(social) ? {} : social;
			if (Object.keys(social).length > 0) {
				const { twitter, facebook, linkedin, youtube, instagram } = social;
				social.twitter = isEmpty(twitter) ? '' : twitter;
				social.facebook = isEmpty(facebook) ? '' : facebook;
				social.linkedin = isEmpty(linkedin) ? '' : linkedin;
				social.instagram = isEmpty(instagram) ? '' : instagram;
				social.youtube = isEmpty(youtube) ? '' : youtube;
			}

			// Set component fields state
			this.setState({
				handle,
				company,
				website,
				location,
				status,
				skills: skillsCSV,
				githubUsername,
				bio,
				twitter: social.twitter,
				facebook: social.facebook,
				linkedin: social.linkedin,
				instagram: social.instagram,
				youtube: social.youtube,
			});
		}
	}

	onSubmit(e) {
		e.preventDefault();
		const { createProfile, clearErrors, history }	= this.props;
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
		clearErrors();
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
							<Link to="/dashboard" className="btn btn-light text-primary">
								Go Back
							</Link>
							<h1 className="display-4 text-center">Edit Your Profile</h1>
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
	profile: PropTypes.shape({ profile: PropTypes.shape({}) }).isRequired,
	errors: PropTypes.shape({}).isRequired,
	createProfile: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired,
	history: PropTypes.shape({}).isRequired,
};

CreateProfile.default = { profile: PropTypes.shape({ profile: null }).isRequired };

export default CreateProfile;
