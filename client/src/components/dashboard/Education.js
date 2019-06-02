/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-indent */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteEducationAction } from '../../redux/actions/profileActions';

class Education extends Component {
	constructor(props) {
		super(props);
		this.onDeleteClick = this.onDeleteClick.bind(this);
	}

	onDeleteClick(eduId) {
		const { deleteEducation } = this.props;
		deleteEducation(eduId);
	}

	render() {
		const { education: educationArr } = this.props;
		let education;
		if (educationArr !== null) {
			education = educationArr.map(edu => (
				<tr key={edu._id}>
					<td>{edu.school}</td>
					<td>{edu.studyField}</td>
					<td>
						<Moment format="YYYY/MM/DD">{edu.from}</Moment> - {edu.current
							? ('Now')
							: (<Moment format="YYYY/MM/DD">{edu.to}</Moment>)}
					</td>
					<td>
						<button type="button" className="btn btn-danger" onClick={() => this.onDeleteClick(edu._id)}>Delete</button>
					</td>
				</tr>
			));
		}

		return (
			<div>
				<h4 className="mb-4">Education</h4>
				<table className="table">
					<thead>
						<tr>
							<th>School</th>
							<th>Degree</th>
							<th>Years</th>
							<th />
						</tr>
						{education}
					</thead>
				</table>
			</div>
		);
	}
}

Education.propTypes = {
	deleteEducation: PropTypes.func.isRequired,
	education: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
};

const mapDispatchToProps = { deleteEducation: deleteEducationAction };

export default connect(null, mapDispatchToProps)(Education);
