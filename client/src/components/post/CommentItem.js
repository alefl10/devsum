/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteCommentAction } from '../../redux/actions/postActions';

class CommentItem extends Component {
	constructor(props) {
		super(props);
		this.onDeleteClick = this.onDeleteClick.bind(this);
	}

	onDeleteClick(postId, commentId) {
		const { deleteComment } = this.props;
		deleteComment(postId, commentId);
	}

	render() {
		const { singleComment, postId, auth } = this.props;
		const { user, avatar, name, text, _id } = singleComment;
		return (
			<div className="card card-body mb-3">
				<div className="row">
					<div className="col-md-2">
						<a href="profile.html">
							<img className="rounded-circle d-none d-md-block" src={avatar} alt="Avatar" />
						</a>
						<br />
						<p className="text-center">{name}</p>
					</div>
					<div className="col-md-10">
						<p className="lead">{text}</p>
						{user === auth.user.id
							? (
								<button type="button" onClick={() => this.onDeleteClick(postId, _id)} className="btn btn-danger mr-1">
									<i className="fas fa-times" />
								</button>
							) : null
						}
					</div>
				</div>
			</div>
		);
	}
}

CommentItem.propTypes = {
	deleteComment: PropTypes.func.isRequired,
	postId: PropTypes.string.isRequired,
	singleComment: PropTypes.shape({}).isRequired,
	auth: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({ auth: state.auth });
const mapDispatchToProps = { deleteComment: deleteCommentAction };

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem);
