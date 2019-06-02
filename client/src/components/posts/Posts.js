/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostForm from './PostForm';
import PostFeed from './PostFeed';
import Spinner from '../common/Spinner';
import { getPostsAction } from '../../redux/actions/postActions';

class Posts extends Component {
	componentDidMount() {
		const { getPosts } = this.props;
		getPosts();
	}

	render() {
		const { post } = this.props;
		const { posts, loading } = post;
		let postContent;

		if (posts === null || loading) {
			postContent = <Spinner />;
		} else {
			const postsExist = posts.length > 0;
			if (postsExist) {
				postContent = <PostFeed posts={posts} />;
			}
		}

		return (
			<div className="feed">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<PostForm />
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
	post: PropTypes.shape({ posts: PropTypes.arrayOf(PropTypes.shape({})) }).isRequired,
};

const mapStateToProps = state => ({ post: state.post });
const mapDispatchToProps = { getPosts: getPostsAction };

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
