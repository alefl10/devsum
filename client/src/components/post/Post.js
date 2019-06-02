/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';
import { getPostAction } from '../../redux/actions/postActions';

class Post extends Component {
	componentDidMount() {
		const { getPost, match } = this.props;
		getPost(match.params.id);
	}

	render() {
		// eslint-disable-next-line react/destructuring-assignment
		const { post, loading } = this.props.post;
		let postContent;

		if (post === null || loading || Object.keys(post).length === 0) {
			postContent = <Spinner />;
		} else {
			postContent = (
				<div>
					<PostItem singlePost={post} showActions={false} />
					<CommentForm postId={post._id} />
					<CommentFeed postId={post._id} comments={post.comments} />
				</div>
			);
		}
		return (
			<div className="post">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<Link to="/feed" className="btn btn-light mb-3">
								Back to feed
							</Link>
							{postContent}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Post.propTypes = {
	getPost: PropTypes.func.isRequired,
	match: PropTypes.shape({}).isRequired,
	post: PropTypes.shape({
		post: PropTypes.shape({}),
		loading: PropTypes.bool,
	}).isRequired,
};

const mapStateToProps = state => ({ post: state.post });
const mapDispatchToProps = { getPost: getPostAction };

export default connect(mapStateToProps, mapDispatchToProps)(Post);
