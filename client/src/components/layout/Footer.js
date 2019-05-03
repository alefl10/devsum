/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-indent */
import React from 'react';

export default function Footer() {
	return (
		<footer className="bg-dark text-white mt-5 p-4 text-center">
			Copyright &copy; {new Date().getFullYear()} Dev Summit
		</footer>
	);
}
