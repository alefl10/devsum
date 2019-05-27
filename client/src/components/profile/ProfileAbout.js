/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';

const ProfileAbout = (props) => {
	const { profile } = props;
	const { user, bio, skills } = profile;
	const firstName = user.name.trim().split(' ')[0];
	const skillsList = skills.map(skill => (
		<div key={`${skill}_${user._id}`} className="p-3">
			<i className="fa fa-check" /> {skill}
		</div>
	));
	return (
		<div className="row">
			<div className="col-md-12">
				<div className="card card-body bg-light mb-3">
					<h3 className="text-center text-info">Bio</h3>
					<p className="text-center">
						{isEmpty(bio) ? (<span>{firstName} does not have a bio</span>) : (<span>{bio}</span>)}
					</p>
					<hr />
					<h3 className="text-center text-info">Skill Set</h3>
					<div className="row">
						<div className="d-flex flex-wrap justify-content-center align-items-center">
							{skillsList}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

ProfileAbout.propTypes = { profile: PropTypes.shape({}).isRequired };

export default ProfileAbout;
