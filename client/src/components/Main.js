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
import CreateProfile from './profile-setup/CreateProfile';
import EditProfile from './profile-setup/EditProfile';
import AddExperience from './profile-setup/AddExperience';
import AddEducation from './profile-setup/AddEducation';
import Profiles from './profiles/Profiles';
import Profile from './profile/Profile';
import Posts from './posts/Posts';
import Post from './post/Post';
import NotFound from './profile/NotFound';
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
		store.dispatch(clearCurrentProfile());
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
				<Route
					exact
					path="/profiles"
					render={() => (
						<div>
							<Profiles {...props} />
						</div>
					)}
				/>
				<Route
					exact
					path="/profile/:handle"
					render={({ match }) => (
						<div>
							<Profile {...props} match={match} />
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
				<Switch>
					<PrivateRoute
						exact
						path="/add-experience"
						component={AddExperience}
						{...props}
					/>
				</Switch>
				<Switch>
					<PrivateRoute
						exact
						path="/add-education"
						component={AddEducation}
						{...props}
					/>
				</Switch>
				<Switch>
					<PrivateRoute
						exact
						path="/feed"
						component={Posts}
						{...props}
					/>
				</Switch>
				<Switch>
					<Route
						exact
						path="/post/:id"
						render={({ match }) => (
							<div>
								<PrivateRoute {...props} match={match} component={Post} />
							</div>
						)}
					/>
				</Switch>
				<Route
					exact
					path="/not-found"
					component={NotFound}
				/>
			</div>
			<Footer />
		</div>
	);
}

export default Main;
