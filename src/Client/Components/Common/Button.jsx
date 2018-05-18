import React from 'react';
import PropTypes from 'prop-types';

const Button = props => (
	<div className={`col-md-12 row d-flex ${props.className}`}>
		<button className="btn btn-primary" onClick={props.manageHandler}>
			{props.text}
		</button>
	</div>
);

Button.propTypes = {
	className: PropTypes.string,
	text: PropTypes.string,
	manageHandler: PropTypes.func
};
Button.defaultProps = {
	className: '',
	text: '',
	manageHandler() {}
};

export default Button;
