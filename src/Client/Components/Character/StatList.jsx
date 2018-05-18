import React from 'react';
import PropTypes from 'prop-types';
import Inputbar from '../Common/InputBar';

class StatList extends React.Component {
	renderAppend(stat) {
		let string = 0;
		const mod = Math.floor((stat[1] - 10) / 2);

		// Check to see if race has any props
		if (Object.keys(this.props.race).length > 0) {
			string = this.props.findMod(
				stat,
				this.props.race,
				this.props.racialBonus
			);
		}

		// To keep the append size the same, if it isn't negative add in a nonblank space
		if (mod >= 0) {
			return `+${string} mod: ${Math.floor((stat[1] - 10) / 2)}\xa0`;
		}

		return `+${string} mod: ${Math.floor((stat[1] - 10) / 2)}`;
	}

	render() {
		return Object.entries(this.props.stats).map(stat => (
			<Inputbar
				manageChange={this.props.manageHandler}
				value={`${stat[1]}`}
				append={this.renderAppend(stat)}
				title={stat[0]}
				key={stat[0]}
				type="number"
				idText={stat[0]}
			/>
		));
	}
}

StatList.propTypes = {
	race: PropTypes.shape({
		stat_bonus: PropTypes.objectOf(PropTypes.number)
	}),
	stats: PropTypes.objectOf(PropTypes.number).isRequired,
	manageHandler: PropTypes.func.isRequired
};

StatList.defaultProps = {
	race: {}
};

export default StatList;
