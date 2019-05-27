/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import Spinner from '../common/Spinner';
import isEmpty from '../../validation/is-empty';

class Profile extends Component {
	componentDidMount() {
		const { getProfileByHandle, match } = this.props;
		if (match.params.handle) {
			getProfileByHandle(match.params.handle);
		}
	}

	componentWillReceiveProps(nextProps) {
		const { profile, history } = this.props;
		if (nextProps.profile.profile === null && profile.loading) {
			history.push('/not-found');
		}
	}

	render() {
		// eslint-disable-next-line react/destructuring-assignment
		const { profile, loading } = this.props.profile;

		// This fixes bug when refresing the site on /profile/${handle}
		if (!profile || isEmpty(profile)) return (<div />);

		const { education, experience, githubUsername } = profile;
		let profileContent;
		if (profile === null || loading) {
			profileContent = <Spinner />;
		} else {
			profileContent = (
				<div>
					<div className="row">
						<div className="col-md-6">
							<Link to="/profiles" className="btn btn-light mb-3 float-left text-primary">
								Back to Developers
							</Link>
						</div>
						<div className="col-md-6" />
					</div>
					<ProfileHeader profile={profile} />
					<ProfileAbout profile={profile} />
					<ProfileCreds education={education} experience={experience} />
					{githubUsername ? (<ProfileGithub username={githubUsername} />) : null}
				</div>
			);
		}
		return (
			<div className="profile">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							{profileContent}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Profile.propTypes = {
	profile: PropTypes.shape({
		profile: PropTypes.shape({}),
		loading: PropTypes.bool.isRequired,
	}).isRequired,
	match: PropTypes.shape({}).isRequired,
	getProfileByHandle: PropTypes.func.isRequired,
	history: PropTypes.shape({}).isRequired,
};

export default Profile;
