import React from 'react';
import PropTypes from 'prop-types';

const InputBar = props => (
	<div className="input-group row">
		<span className=" col-md-3 input-group-text" id={`${props.name}-label`}>
			{props.title}
		</span>
		<input
			type={props.type}
			placeholder={props.placeHolder}
			className="form-control "
			name={props.name}
			disabled={!props.editing}
			onChange={props.manageChange}
			value={props.value}
			id={typeof props.idText !== 'undefined' ? props.idText : ''}
		/>

		{typeof props.append !== 'undefined' ? (
			<div className="input-group-append">
				<span className="input-group-text">{props.append}</span>
			</div>
		) : (
			''
		)}
	</div>
);

InputBar.propTypes = {
	title: PropTypes.string.isRequired,
	type: PropTypes.string,
	name: PropTypes.string,
	value: PropTypes.string,
	idText: PropTypes.string,
	placeHolder: PropTypes.string,
	manageChange: PropTypes.func.isRequired,
	append: PropTypes.string,
	editing: PropTypes.bool
};

InputBar.defaultProps = {
	type: '',
	name: '',
	value: '',
	placeHolder: '',
	idText: '',
	append: undefined,
	editing: true
};
export default InputBar;
