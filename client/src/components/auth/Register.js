/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames'; // Useful package for conditional HTML classes
import { connect } from 'react-redux'; // Needed when using redux in a React Component
import { registerUser } from '../../actions/authActions';

class Register extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
			email: '',
			password: '',
			password2: '',
			errors: {},
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	onSubmit(e) {
		e.preventDefault();
		const { name, email, password, password2 } = this.state;
		const newUser = { name, email, password, password2 };

		// eslint-disable-next-line react/destructuring-assignment
		this.props.registerUser(newUser, this.props.history);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		const { name, email, password, password2, errors } = this.state;
		// const { auth } = this.props;
		return (
			<div>
				<div className="register">
					<div className="container">
						<div className="row">
							<div className="col-md-8 m-auto">
								<h1 className="display-4 text-center">Sign Up</h1>
								<p className="lead text-center">Create your DevSum account</p>
								<form onSubmit={this.onSubmit}>
									<div className="form-group">
										<input
											type="text"
											className={classnames('form-control form-control-lg', { 'is-invalid': errors.name })}
											placeholder="Name"
											name="name"
											value={name}
											onChange={this.onChange}
										/>
										{ errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
									</div>
									<div className="form-group">
										<input
											type="email"
											className={classnames('form-control form-control-lg', { 'is-invalid': errors.email })}
											placeholder="Email Address"
											name="email"
											value={email}
											onChange={this.onChange}
										/>
										<small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
										{ errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
									</div>
									<div className="form-group">
										<input
											type="password"
											className={classnames('form-control form-control-lg', { 'is-invalid': errors.password })}
											placeholder="Password"
											name="password"
											value={password}
											onChange={this.onChange}
										/>
										{ errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
									</div>
									<div className="form-group">
										<input
											type="password"
											className={classnames('form-control form-control-lg', { 'is-invalid': errors.password2 })}
											placeholder="Confirm Password"
											name="password2"
											value={password2}
											onChange={this.onChange}
										/>
										{ errors.password2 && (<div className="invalid-feedback">{errors.password2}</div>)}
									</div>
									<input type="submit" className="btn btn-info btn-block mt-4" />
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Register.propTypes = {
	registerUser: PropTypes.func.isRequired,
	// auth: PropTypes.shape({
	// 	isAuthenticated: PropTypes.bool.isRequired,
	// 	user: PropTypes.shape({
	// 		name: PropTypes.string.isRequired,
	// 		email: PropTypes.string.isRequired,
	// 		password: PropTypes.string.isRequired,
	// 		password2: PropTypes.string.isRequired,
	// 	}).isRequired,
	// }).isRequired,
	errors: PropTypes.shape({}).isRequired,
	history: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({ auth: state.auth, errors: state.errors });

// withRouter allows to redirect from redux actions
export default connect(mapStateToProps, { registerUser })(withRouter(Register));
