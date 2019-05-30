/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import React from 'react';
import PropTypes from 'prop-types';
import PostItem from './PostItem';

const PostFeed = (props) => {
	const { posts } = props.post;
	// eslint-disable-next-line no-underscore-dangle
	return posts.map(post => <PostItem key={post._id} singlePost={post} {...props} />);
};

// eslint-disable-next-line max-len
PostFeed.propTypes = { post: PropTypes.shape({ posts: PropTypes.arrayOf(PropTypes.shape({})) }).isRequired };

export default PostFeed;
