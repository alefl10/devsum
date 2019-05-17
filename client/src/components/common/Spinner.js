/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-tag-spacing */
import React from 'react';
import spinner from '../../img/spinner.gif';

export default function Spinner() {
	return (
		<div>
			<img
				src={spinner}
				alt="Loading..."
				style={{ width: '200px', margin: 'auto', display: 'block' }}
			/>
		</div>
	);
}
