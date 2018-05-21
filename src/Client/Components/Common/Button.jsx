import React from 'react';
import PropTypes from 'prop-types';

const Button = props => (
	<div className={`row d-flex ${props.className}`}>
		<button
			className={`btn ${
				props.buttonColor !== '' ? props.buttonColor : 'btn-primary'
			} `}
			disabled={!props.editing}
			onClick={props.manageHandler}
		>
			{props.text}
		</button>
	</div>
);

Button.propTypes = {
	className: PropTypes.string,
	text: PropTypes.string,
	manageHandler: PropTypes.func,
	editing: PropTypes.bool,
	buttonColor: PropTypes.string
};
Button.defaultProps = {
	className: '',
	text: '',
	manageHandler() {},
	editing: true,
	buttonColor: ''
};

export default Button;
