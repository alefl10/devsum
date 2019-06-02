/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deletePostAction, likeUnlikeAction } from '../../redux/actions/postActions';

class PostItem extends Component {
	constructor(props) {
		super(props);
		this.onDeleteClick = this.onDeleteClick.bind(this);
		this.onLikeUnlikeClick = this.onLikeUnlikeClick.bind(this);
		this.findUserLike = this.findUserLike.bind(this);
	}

	onDeleteClick(postId) {
		const { deletePost } = this.props;
		deletePost(postId);
	}

	onLikeUnlikeClick(postId) {
		const { likeUnlike } = this.props;
		likeUnlike(postId);
	}

	findUserLike(likes) {
		const { auth } = this.props;
		if (likes.filter(like => like.user === auth.user.id).length > 0) {
			return true;
		}
		return false;
	}

	render() {
		const { singlePost, auth, showActions } = this.props;
		const { user, avatar, name, text, likes, _id } = singlePost;
		return (
			<div className="card card-body mb-3">
				<div className="row">
					<div className="col-md-2">
						<img className="rounded-circle d-none d-md-block" src={avatar} alt="Avatar" />
						<br />
						<p className="text-center text-primary"><strong>{name}</strong></p>
					</div>
					<div className="col-md-10">
						<p className="lead">{text}</p>
						{showActions ? (
							<span>
								<button type="button" className="btn btn-light mr-1" onClick={() => this.onLikeUnlikeClick(_id)}>
									<i className={classnames('fas fa-thumbs-up', { 'text-info': this.findUserLike(likes) })} />
									<span className="badge badge-light">{likes.length}</span>
								</button>
								<Link to={`/post/${_id}`} className="btn btn-info mr-1">
									Comments
								</Link>
								{user === auth.user.id
									? (
										<button type="button" onClick={() => this.onDeleteClick(_id)} className="btn btn-danger mr-1">
											<i className="fas fa-times" />
										</button>
									) : null
								}
							</span>
						) : null}
					</div>
				</div>
			</div>
		);
	}
}

PostItem.defaultProps = { showActions: true };

PostItem.propTypes = {
	profile: PropTypes.shape({}).isRequired,
	auth: PropTypes.shape({}).isRequired,
	singlePost: PropTypes.shape({}).isRequired,
	deletePost: PropTypes.func.isRequired,
	likeUnlike: PropTypes.func.isRequired,
	showActions: PropTypes.bool,
};

const mapStateToProps = state => ({ profile: state.profile, auth: state.auth });
const mapDispatchToProps = { deletePost: deletePostAction, likeUnlike: likeUnlikeAction };

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);
