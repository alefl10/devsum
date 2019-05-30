/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

class CommentForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: '',
			errors: {},
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		const { errors } = nextProps;
		if (errors) {
			this.setState({ errors });
		}
		if (Object.keys(errors).length > 0) {
			this.setState({ errors, text: errors.inputField });
		}
	}

	onSubmit(e) {
		e.preventDefault();
		const { text } = this.state;
		const { auth, addComment, postId, clearErrors } = this.props;
		const { name, avatar } = auth.user;
		const newComment = { name, avatar, text };
		clearErrors();
		addComment(postId, newComment);
		this.setState({ text: '' });
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		const { text, errors } = this.state;
		return (
			<div className="post-form mb-3">
				<div className="card card-info">
					<div className="card-header bg-info text-white">
						Say Something...
					</div>
					<div className="card-body">
						<form onSubmit={this.onSubmit}>
							<div className="form-group">
								<TextAreaFieldGroup
									placeholder="Comment on this post"
									name="text"
									value={text}
									onChange={this.onChange}
									error={errors.text}
								/>
							</div>
							<button type="submit" className="btn btn-dark">Submit</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

CommentForm.propTypes = {
	addComment: PropTypes.func.isRequired,
	postId: PropTypes.string.isRequired,
	clearErrors: PropTypes.func.isRequired,
	auth: PropTypes.shape({}).isRequired,
	errors: PropTypes.shape({}).isRequired,
};

export default CommentForm;
