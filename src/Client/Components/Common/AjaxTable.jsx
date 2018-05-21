import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import $ from 'jquery';

$.DataTable = require('datatables.net-bs4');

function renderTD(obj) {
	return Object.entries(obj).map(value => {
		console.log(typeof value[1]);
		if (typeof value[1] === 'object') {
			return (
				<td key={value[0]}>
					<table className="table table-sm ">
						<thead>
							<tr>
								{Object.keys(value[1]).map(key => (
									<th
										className="text-center"
										key={`internal-${obj.id}-${key}`}
									>
										{key}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							<tr>
								{Object.entries(value[1]).map(values => (
									<td
										className="text-center"
										key={`internal-${obj.id}-${values[0]}-${
											values[1]
										}`}
									>
										{values[1]}
									</td>
								))}
							</tr>
						</tbody>
					</table>
				</td>
			);
		}

		return (
			<td className="text-center" key={value[0]}>
				{value[1].toString()}
			</td>
		);
	});
}
class AjaxTable extends Component {
	state = { data: [], recievedData: false };

	componentDidMount() {
		axios.get(this.props.url).then(response => {
			console.log(this.props.url, response.data);

			console.log(response.data);
			this.setState({ data: response.data, recievedData: true });
		});
	}

	componentDidUpdate() {
		if (!$.fn.dataTable.isDataTable(`#table-${this.props.name}`)) {
			$(`#table-${this.props.name}`).DataTable({
				dom:
					'<"col-md-12 row"<"row col-md-6"l><"col-md-6 d-flex justify-content-end"f>>' +
					'<"row"<"col-md-12" tr>>' +
					'<"col-md-12 row"<"col-md-6"i><"col-md-6 d-flex justify-content-end"p>>'
			});
		}
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
				{!this.state.recievedData ? (
					<div className="col-md-12 d-flex justify-content-center">
						<div className="progress col-md-8 align-self-center">
							<div
								className="progress-bar progress-bar-striped progress-bar-animated"
								role="progressbar"
								style={{ width: '100%' }}
							/>
						</div>
					</div>
				) : (
					<table
						className=" col-md-12 table table-striped table-hover table-sm table-bordered table-responsive-md"
						id={`table-${this.props.name}`}
					>
						<thead className="thead-dark">
							<tr>
								{this.props.headers.map(header => (
									<th
										key={`header-${header}`}
										className=" text-center"
									>
										{header}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{this.state.data.constructor === Array
								? this.state.data.map(obj => (
									<tr
										key={`${this.props.name}-${obj.id}`}
									>
										{renderTD(obj)}

										{this.props.buttonUrl ? (
											<td>
												<Link
													to={`${
														this.props.buttonUrl
													}/${obj.id}`}
													className="btn btn-primary"
												>
														view
												</Link>
											</td>
										) : null}
									</tr>
								  ))
								: Object.values(this.state.data).map(value =>
									value.map(obj => (
										<tr
											key={`${this.props.name}-${
												obj.id
											}`}
										>
											{renderTD(obj)}

											{this.props.buttonUrl ? (
												<td>
													<Link
														to={{
															pathname: `${
																this.props
																	.buttonUrl
															}/${obj.id}`,
															state: { obj }
														}}
														className="btn btn-primary"
													>
															view
													</Link>
												</td>
											) : null}
										</tr>
									))
								  )}
						</tbody>
					</table>
				)}
			</div>
		);
	}
}

AjaxTable.propTypes = {
	url: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	headers: PropTypes.arrayOf(PropTypes.string).isRequired,
	buttonUrl: PropTypes.string
};

AjaxTable.defaultProps = {
	buttonUrl: null
};

export default AjaxTable;
