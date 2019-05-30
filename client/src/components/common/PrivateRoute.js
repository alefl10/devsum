/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, ...props }) => {
	const { auth } = props;
	return (
		<Route
			render={({ match }) => {
				const componentOrRedirect = auth.isAuthenticated
					? (<Component {...props} match={match} />)
					: (<Redirect to="/login" />);
				return componentOrRedirect;
			}}
		/>
	);
};

PrivateRoute.propTypes = {
	component: PropTypes.func.isRequired,
	auth: PropTypes.shape({
		isAuthenticated: PropTypes.bool.isRequired,
	}).isRequired,
};

export default PrivateRoute;
