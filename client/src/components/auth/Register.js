/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUserAction } from '../../redux/actions/authActions';

import TextFieldGroup from '../common/TextFieldGroup';

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

	componentDidMount() {
		// eslint-disable-next-line react/destructuring-assignment
		const { auth, history } = this.props;
		if (auth.isAuthenticated) {
			history.push('/dashboard');
		}
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
		const { registerUser, history } = this.props;
		registerUser(newUser, history);
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
									<TextFieldGroup
										placeholder="Name"
										name="name"
										value={name}
										onChange={this.onChange}
										error={errors.name}
									/>
									<TextFieldGroup
										placeholder="Email"
										name="email"
										type="email"
										value={email}
										onChange={this.onChange}
										error={errors.email}
										info="This site uses Gravatar. If you want a profile image, use a gravatar email"
									/>
									<TextFieldGroup
										placeholder="Password"
										name="password"
										type="password"
										value={password}
										onChange={this.onChange}
										error={errors.password}
									/>
									<TextFieldGroup
										placeholder="Confirm Password"
										name="password2"
										type="password"
										value={password2}
										onChange={this.onChange}
										error={errors.password2}
									/>
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
	auth: PropTypes.shape({
		isAuthenticated: PropTypes.bool.isRequired,
		user: PropTypes.shape({}).isRequired,
	}).isRequired,
	errors: PropTypes.shape({}).isRequired,
	history: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({ auth: state.auth, errors: state.errors });
const mapDispatchToProps = { registerUser: registerUserAction };

export default connect(mapStateToProps, mapDispatchToProps)(Register);
