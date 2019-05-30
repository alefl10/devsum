/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostForm from './PostForm';
import PostFeed from './PostFeed';
import Spinner from '../common/Spinner';

class Posts extends Component {
	componentDidMount() {
		const { getPosts, clearErrors } = this.props;
		clearErrors();
		getPosts();
	}

	render() {
		const { post } = this.props;
		const { posts, loading } = post;
		let postContent;

		if (posts === null || loading) {
			postContent = <Spinner />;
		} else {
			postContent = <PostFeed {...this.props} />;
		}

		return (
			<div className="feed">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<PostForm {...this.props} />
							{postContent}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Posts.propTypes = {
	getPosts: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired,
	post: PropTypes.shape({ posts: PropTypes.arrayOf(PropTypes.shape({})) }).isRequired,
};

export default Posts;
