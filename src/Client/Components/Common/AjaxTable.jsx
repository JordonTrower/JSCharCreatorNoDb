import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import $ from 'jquery';

$.DataTable = require('datatables.net-bs4');

class AjaxTable extends Component {
	state = { data: [] };

	componentDidMount() {
		axios.get(this.props.url).then(response => {
			console.log(response);
			this.setState({ data: response.data });
		});
	}

	componentDidUpdate() {
		$(`#table-${this.props.name}`).DataTable();
	}

	componentWillUnmount() {
		$(`#table-${this.props.name}`)
			.DataTable()
			.destroy();
	}

	render() {
		return (
			<div>
				<h2 className="col-md-12">{this.props.name}</h2>
				<table
					className="table table-striped"
					id={`table-${this.props.name}`}
				>
					<thead className="thead-dark">
						<tr>
							{this.props.headers.map(header => (
								<th key={`header-${header}`}>{header}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{this.state.data.map(obj => (
							<tr key={`${this.props.name}-${obj.id}`}>
								{Object.entries(obj).map(value => (
									<td key={value[0]}>{value[1]}</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}
}

AjaxTable.propTypes = {
	url: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	headers: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default AjaxTable;
