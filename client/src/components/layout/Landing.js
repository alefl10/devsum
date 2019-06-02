/* eslint-disable react/jsx-indent */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Landing extends Component {
	componentDidMount() {
		// eslint-disable-next-line react/destructuring-assignment
		const { auth, history } = this.props;
		if (auth.isAuthenticated) {
			history.push('/dashboard');
		}
	}

	render() {
		return (
			<div>
				<div className="landing">
					<div className="dark-overlay landing-inner text-light">
						<div className="container">
							<div className="row">
								<div className="col-md-12 text-center">
									<h1 className="display-3 mb-4">Developer Summit</h1>
									<p className="lead"> Create a developer profile/portfolio, share posts and get help from other developers</p>
									<hr />
									<Link to="/register" className="btn btn-lg btn-info mr-2">Sign Up</Link>
									<Link to="/login" className="btn btn-lg btn-light">Login</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Landing.propTypes = {
	history: PropTypes.shape({}).isRequired,
	auth: PropTypes.shape({ isAuthenticated: PropTypes.bool.isRequired }).isRequired,
};

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps)(Landing);
