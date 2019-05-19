/* eslint-disable no-undef */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import React from 'react';
import { Route, Switch } from 'react-router-dom'; // Switch is necessary for the private route redirect
import jwtDecode from 'jwt-decode';
import store from '../redux/store';
import setAuthToken from '../utils/setAuthToken';
import { setCurrentUser, logoutUser } from '../redux/actions/authActions';
import { clearCurrentProfile } from '../redux/actions/profileActions';
import PrivateRoute from './common/PrivateRoute';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import Landing from './layout/Landing';
import Register from './auth/Register';
import Login from './auth/Login';
import Dashboard from './dashboard/Dashboard';
import CreateProfile from './profile/CreateProfile';
import EditProfile from './profile/EditProfile';
import './Main.css';

// Check for token - this allows to keep logged in users info after refreshing website
if (localStorage.jwtToken) {
	// Set auth token header auth
	setAuthToken(localStorage.jwtToken);
	// Decode token and get user info and exp
	const decoded = jwtDecode(localStorage.jwtToken);
	// Set user and isAuthenticated
	store.dispatch(setCurrentUser(decoded));
	// Check for expired token
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		// Logout user
		store.dispatch(logoutUser());
		// Clear current Profile
		store.dispatch(clearCurrentProfile);
		// Redirect to login
		window.location.href = '/login';
	}
}

function Main(props) {
	return (
		<div className="App">
			<Navbar {...props} />
			<Route
				exact
				path="/"
				render={() => (
					<div>
						<Landing {...props} />
					</div>
				)}
			/>
			<div className="container">
				<Route
					exact
					path="/register"
					render={() => (
						<div>
							<Register {...props} />
						</div>
					)}
				/>
				<Route
					exact
					path="/login"
					render={() => (
						<div>
							<Login {...props} />
						</div>
					)}
				/>
				<Switch>
					<PrivateRoute
						exact
						path="/dashboard"
						component={Dashboard}
						{...props}
					/>
				</Switch>
				<Switch>
					<PrivateRoute
						exact
						path="/create-profile"
						component={CreateProfile}
						{...props}
					/>
				</Switch>
				<Switch>
					<PrivateRoute
						exact
						path="/edit-profile"
						component={EditProfile}
						{...props}
					/>
				</Switch>
			</div>
			<Footer />
		</div>
	);
}

export default Main;
