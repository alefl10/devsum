/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-indent */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import ProfileActions from './ProfileActions';

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.onDeleteClick = this.onDeleteClick.bind(this);
	}

	componentDidMount() {
		const { getCurrentProfile } = this.props;
		getCurrentProfile();
	}

	onDeleteClick() {
		const { deleteAccount } = this.props;
		deleteAccount();
	}

	render() {
		const { user } = this.props.auth;
		const { profile, loading } = this.props.profile;

		let dashboardContent;

		if (profile === null || loading) {
			dashboardContent = <Spinner />;
		} else {
			// Check if logged in user has profile data
			const emptyProfile = Object.keys(profile).length <= 0;
			if (!emptyProfile) {
				dashboardContent = (
					<div>
						<p className="lead text-muted">
							Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>!
						</p>
						<ProfileActions />
						{/* TODO: Experience and Education */}
						<div style={{ marginBottom: '60px' }}>
							<button onClick={this.onDeleteClick} type="button" className="btn btn-danger">
								Delete My Account
							</button>
						</div>
					</div>
				);
			} else {
				// User is logged in but has no profile
				dashboardContent = (
					<div>
						<p className="lead text-muted">Welcome {user.name}!</p>
						<p>You have not yet setup a profile, please add some info</p>
						<Link to="/create-profile" className="btn btn-lg btn-info">Create Profile</Link>
					</div>
				);
			}
		}
		return (
			<div className="dashboard">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h1 className="display-4">Dashboard</h1>
							{dashboardContent}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Dashboard.propTypes = {
	auth: PropTypes.shape({ user: PropTypes.shape({}).isRequired }).isRequired,
	profile: PropTypes.shape({
		profile: PropTypes.shape({}),
		loading: PropTypes.bool.isRequired,
	}).isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	deleteAccount: PropTypes.func.isRequired,
};

Dashboard.default = { profile: PropTypes.shape({ profile: null }) };

export default Dashboard;
