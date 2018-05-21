import React from 'react';
import PropTypes from 'prop-types';

const CheckList = props =>
	props.data.map(armor => (
		<div className="form-check d-flex pr-2" key={`checklist-${armor.id}`}>
			<label htmlFor={`armor-${armor.id}`} className="form-check-label">
				<input
					type="checkbox"
					disabled={!props.editing}
					name={`armor-${armor.id}`}
					id={`armor-${armor.id}`}
					className="form-check-input "
					checked={props.selected.includes(armor.id)}
					onClick={props.manageHandler}
				/>
				{armor.name}
			</label>
		</div>
	));
export default CheckList;

CheckList.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			name: PropTypes.string
		})
	).isRequired,
	selected: PropTypes.arrayOf(PropTypes.number),
	manageHandler: PropTypes.func.isRequired
};

CheckList.defaultProps = {
	editing: true,
	selected: []
};
