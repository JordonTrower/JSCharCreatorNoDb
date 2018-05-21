import React from 'react';
import PropTypes from 'prop-types';

const SelectBar = props => (
	<div className={`input-group ${props.className} row`}>
		<span className="col-md-3 input-group-text" id="race-label">
			{props.title}
		</span>
		<select
			name={props.name}
			id={props.name}
			className="form-control"
			onChange={props.manageChange}
			value={props.value}
			disabled={!props.editing}
		>
			<option value="" />
			{props.data.map(
				(obj, index) =>
					typeof obj !== 'object' ? (
						<option key={obj} value={obj}>
							{obj}
						</option>
					) : (
						<option key={obj.name} value={index}>
							{obj.name}
						</option>
					)
			)}
		</select>
	</div>
);

SelectBar.propTypes = {
	title: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	manageChange: PropTypes.func.isRequired,
	data: PropTypes.arrayOf(PropTypes.obj).isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	editing: PropTypes.bool
};

SelectBar.defaultProps = {
	value: '',
	editing: true
};
export default SelectBar;
