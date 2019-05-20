/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-indent */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

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
					<td>{edu.company}</td>
					<td>{edu.title}</td>
					<td>
						<Moment format="YYYY/MM/DD">{edu.from}</Moment> - {edu.to === null
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
							<th>Company</th>
							<th>Title</th>
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

export default Education;
