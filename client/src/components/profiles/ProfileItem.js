/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';

class ProfileItem extends Component {
	render() {
		const { profile } = this.props;
		const { user, company, location, handle, skills } = profile;

		return (
			<div className="card card-body bg-light mb-3">
				<div className="row">
					<div className="col-2">
						<img src={user.avatar} alt="User Avatar" className="rounded-circle" />
					</div>
					<div className="col lg-6 col-md 4 col-8">
						<h3>{user.name}</h3>
						<p>
							{profile.status} {isEmpty(company) ? null : (<span>at {company}</span>)}
						</p>
						<p>{isEmpty(location) ? null : (<span>{location}</span>)}</p>
						<Link to={`/profile/${handle}`} className="btn btn-info">
							View Profile
						</Link>
					</div>
					<div className="col-md-4 d-none d-md-block">
						<h4>Skill Set</h4>
						<ul className="list-group">
							{skills.slice(0, 4).map(skill => (
								// eslint-disable-next-line react/no-array-index-key
								<li key={`${user.name}_${skill}`} className="list-group-item">
									<i className="fa fa-check pr-2" />
									{skill}
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

ProfileItem.propTypes = { profile: PropTypes.shape({}).isRequired };

export default ProfileItem;
