/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUserAction } from '../../redux/actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Login extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
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
		const { history } = this.props;
		if (nextProps.auth.isAuthenticated) {
			history.push('/dashboard');
		}

		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit(e) {
		e.preventDefault();
		const { email, password } = this.state;
		const userData = { email, password };
		const { loginUser } = this.props;
		loginUser(userData);
	}

	render() {
		const { email, password, errors } = this.state;
		return (
			<div className="login">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Log In</h1>
							<p className="lead text-center">Sign in to your DevConnector account</p>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									placeholder="Email Address"
									name="email"
									type="email"
									value={email}
									onChange={this.onChange}
									error={errors.email}
								/>
								<TextFieldGroup
									placeholder="Password"
									name="password"
									type="password"
									value={password}
									onChange={this.onChange}
									error={errors.password}
								/>
								<input type="submit" className="btn btn-info btn-block mt-4" />
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	errors: PropTypes.shape({}).isRequired,
	history: PropTypes.shape({}).isRequired,
	auth: PropTypes.shape({ isAuthenticated: PropTypes.bool.isRequired }).isRequired,
};

const mapStateToProps = state => ({ auth: state.auth, errors: state.errors });
const mapDispatchToProps = { loginUser: loginUserAction };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
