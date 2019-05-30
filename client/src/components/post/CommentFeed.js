/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import React from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

const CommentFeed = (props) => {
	const { comments, postId } = props;
	return comments.map(comment => (
		<CommentItem
			key={comment._id}
			singleComment={comment}
			postId={postId}
			{...props}
		/>
	));
};

// eslint-disable-next-line max-len
CommentFeed.propTypes = {
	comments: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
	postId: PropTypes.string.isRequired,
};

export default CommentFeed;
