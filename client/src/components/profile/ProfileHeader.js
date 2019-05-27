/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';

const ProfileHeader = (props) => {
	const { profile } = props;
	const { user, status, company, location, website, social } = profile;
	const { avatar, name } = user;
	return (
		<div className="row">
			<div className="col-md-12">
				<div className="card card-body bg-info text-white mb-3">
					<div className="row">
						<div className="col-4 col-md-3 m-auto">
							<img className="rounded-circle" src={avatar} alt="Avatar" />
						</div>
					</div>
					<div className="text-center">
						<h1 className="display-4 text-center">{name}</h1>
						<p className="lead text-center"><i>{status}</i> {isEmpty(company) ? null : (<span><i>at {company}</i></span>)}</p>
						<p>{isEmpty(location) ? null : (<u>{location}</u>)}</p>
						<p>
							{isEmpty(website) ? null : (
								<a className="text-white p-2" href={website} target="_blank" rel="noopener noreferrer">
									<i className="fas fa-globe fa-2x" />
								</a>
							)}

							{isEmpty(social && social.twitter) ? null : (
								<a className="text-white p-2" href={social.twitter} target="_blank" rel="noopener noreferrer">
									<i className="fab fa-twitter fa-2x" />
								</a>
							)}

							{isEmpty(social && social.facebook) ? null : (
								<a className="text-white p-2" href={social.facebook} target="_blank" rel="noopener noreferrer">
									<i className="fab fa-facebook fa-2x" />
								</a>
							)}

							{isEmpty(social && social.linkedin) ? null : (
								<a className="text-white p-2" href={social.linkedin} target="_blank" rel="noopener noreferrer">
									<i className="fab fa-linkedin fa-2x" />
								</a>
							)}

							{isEmpty(social && social.youtube) ? null : (
								<a className="text-white p-2" href={social.youtube} target="_blank" rel="noopener noreferrer">
									<i className="fab fa-youtube fa-2x" />
								</a>
							)}
							{isEmpty(social && social.instagram) ? null : (
								<a className="text-white p-2" href={social.instagram} target="_blank" rel="noopener noreferrer">
									<i className="fab fa-instagram fa-2x" />
								</a>
							)}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

ProfileHeader.propTypes = { profile: PropTypes.shape({}).isRequired };

export default ProfileHeader;
