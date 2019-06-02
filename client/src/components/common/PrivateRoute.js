/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, auth }) => (
	<Route
		render={(props) => {
			const componentOrRedirect = auth.isAuthenticated
				? (<Component {...props} />)
				: (<Redirect to="/login" />);
			return componentOrRedirect;
		}}
	/>
);

PrivateRoute.propTypes = {
	component: PropTypes.shape({}).isRequired,
	auth: PropTypes.shape({
		isAuthenticated: PropTypes.bool.isRequired,
	}).isRequired,
};

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps)(PrivateRoute);
