/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfilesAction } from '../../redux/actions/profileActions';
import Spinner from '../common/Spinner';
import ProfileItem from './ProfileItem';
import isEmpty from '../../validation/is-empty';

class Profiles extends Component {
	componentDidMount() {
		const { getProfiles } = this.props;
		getProfiles();
	}

	render() {
		const { profile } = this.props;
		const { profiles, loading } = profile;
		let profileItems;

		if (profiles === null || loading || isEmpty(profile)) {
			profileItems = <Spinner />;
		} else {
			const profilesExist = profiles.length > 0;
			if (profilesExist && typeof profiles !== 'string') {
				profileItems = profiles.map(profileItem => (
					<ProfileItem key={`${profileItem.user.name}_${profileItem.user._id}`} profile={profileItem} />
				));
			} else {
				profileItems = <h4>No profiles found...</h4>;
			}
		}
		return (
			<div className="profiles">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h1 className="display-4 text-center">Developer Profiles</h1>
							<p className="lead text-center">
								Browser and connect with developers
							</p>
							{profileItems}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Profiles.propTypes = {
	profile: PropTypes.shape({}).isRequired,
	getProfiles: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ profile: state.profile });
const mapDispatchToProps = { getProfiles: getProfilesAction };

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
