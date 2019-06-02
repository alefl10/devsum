/* eslint-disable no-undef */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; // Switch is necessary for the private route redirect
import { Provider } from 'react-redux';
import jwtDecode from 'jwt-decode';
import store from '../redux/store';
import setAuthToken from '../utils/setAuthToken';
import { setCurrentUserAction, logoutUserAction } from '../redux/actions/authActions';
import { clearCurrentProfileAction } from '../redux/actions/profileActions';
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
import './App.css';

// Check for token - this allows to keep logged in users info after refreshing website
if (localStorage.jwtToken) {
	// Set auth token header auth
	setAuthToken(localStorage.jwtToken);
	// Decode token and get user info and exp
	const decoded = jwtDecode(localStorage.jwtToken);
	// Set user and isAuthenticated
	store.dispatch(setCurrentUserAction(decoded));
	// Check for expired token
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		// Logout user
		store.dispatch(logoutUserAction());
		// Clear current Profile
		store.dispatch(clearCurrentProfileAction());
		// Redirect to login
		window.location.href = '/dashboard';
	}
}

function Main() {
	return (
		<Provider store={store}>
			<Router>
				<div className="App">
					<Navbar />
					<Route exact path="/" component={Landing} />
					<div className="container">
						<Route exact path="/register" component={Register} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/profiles" component={Profiles} />
						<Route exact path="/profile/:handle" component={Profile} />
						<Switch>
							<PrivateRoute exact path="/dashboard" component={Dashboard} />
						</Switch>
						<Switch>
							<PrivateRoute exact path="/create-profile" component={CreateProfile} />
						</Switch>
						<Switch>
							<PrivateRoute exact path="/edit-profile" component={EditProfile} />
						</Switch>
						<Switch>
							<PrivateRoute exact path="/add-experience" component={AddExperience} />
						</Switch>
						<Switch>
							<PrivateRoute exact path="/add-education" component={AddEducation} />
						</Switch>
						<Switch>
							<PrivateRoute exact path="/feed" component={Posts} />
						</Switch>
						<Switch>
							<Route exact path="/post/:id">
								<PrivateRoute component={Post} />
							</Route>
						</Switch>
						<Route exact path="/not-found" component={NotFound} />
					</div>
					<Footer />
				</div>
			</Router>
		</Provider>
	);
}

export default Main;
