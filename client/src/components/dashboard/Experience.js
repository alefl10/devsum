/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-indent */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import isEmpty from '../../validation/is-empty';
import { deleteExperienceAction } from '../../redux/actions/profileActions';

class Experience extends Component {
	constructor(props) {
		super(props);
		this.onDeleteClick = this.onDeleteClick.bind(this);
	}

	onDeleteClick(expId) {
		const { deleteExperience } = this.props;
		deleteExperience(expId);
	}

	render() {
		const { experience: experienceArr } = this.props;
        let experience;
		if (experienceArr !== null) {
			experience = experienceArr.map(exp => (
				<tr key={exp._id}>
					<td>{exp.company}</td>
					<td>{exp.title}</td>
					<td>
						<Moment format="YYYY/MM/DD">{exp.from}</Moment> - {exp.current
							? ('Now')
							: (<Moment format="YYYY/MM/DD">{exp.to}</Moment>)}
					</td>
					<td>
						<button type="button" className="btn btn-danger" onClick={() => this.onDeleteClick(exp._id)}>Delete</button>
					</td>
				</tr>
			));
		}

		return (
			<div>
				<h4 className="mb-4">Experience</h4>
				<table className="table">
					<thead>
						<tr>
							<th>Company</th>
							<th>Title</th>
							<th>Years</th>
							<th />
						</tr>
						{experience}
					</thead>
				</table>
			</div>
		);
	}
}

Experience.propTypes = {
	deleteExperience: PropTypes.func.isRequired,
	experience: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
};

const mapDispatchToProps = { deleteExperience: deleteExperienceAction };

export default connect(null, mapDispatchToProps)(Experience);
