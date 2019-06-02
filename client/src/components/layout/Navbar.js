/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUserAction } from '../../redux/actions/authActions';
import { clearCurrentProfileAction } from '../../redux/actions/profileActions';

class Navbar extends Component {
	constructor() {
		super();
		this.onLogoutClick = this.onLogoutClick.bind(this);
	}

	onLogoutClick(e) {
		e.preventDefault();
		const { clearCurrentProfile, logoutUser } = this.props;
		clearCurrentProfile();
		logoutUser();
	}

	render() {
		const { auth } = this.props;
		const { isAuthenticated, user } = auth;
		const authLinks = (
			<ul className="navbar-nav ml-auto">
				<li className="nav-item">
					<Link className="nav-link" to="/feed">Post Feed</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/dashboard">Dashboard</Link>
				</li>
				<li className="nav-item">
					{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
					<a href="#" onClick={this.onLogoutClick} className="nav-link">
						{'Logout  '}
						<img
							src={user.avatar}
							className="rounded-circle"
							alt={user.name}
							style={{ width: '25px', marginRight: '5px' }}
							title="You must have a Gravatar connected to your email to display an image"
						// eslint-disable-next-line react/jsx-one-expression-per-line
						/>
					</a>
				</li>
			</ul>
		);

		const guestLinks = (
			<ul className="navbar-nav ml-auto">
				<li className="nav-item">
					<Link className="nav-link" to="/register">Sign Up</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/login">Login</Link>
				</li>
			</ul>
		);

		return (
			<div>
				<nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
					<div className="container">
						<Link className="navbar-brand" to="/">DevSum</Link>
						<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
							<span className="navbar-toggler-icon" />
						</button>

						<div className="collapse navbar-collapse" id="mobile-nav">
							<ul className="navbar-nav mr-auto">
								<li className="nav-item">
									<Link className="nav-link" to="/profiles"> Developers</Link>
								</li>
							</ul>
							{isAuthenticated ? authLinks : guestLinks}
						</div>
					</div>
				</nav>
			</div>
		);
	}
}

Navbar.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	clearCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.shape({
		isAuthenticated: PropTypes.bool.isRequired,
		user: PropTypes.shape({}).isRequired,
	}).isRequired,
};

const mapStateToProps = state => ({ auth: state.auth });
const mapDispatchToProps = {
	logoutUser: logoutUserAction,
	clearCurrentProfile: clearCurrentProfileAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
