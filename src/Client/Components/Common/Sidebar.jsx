import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const Sidebar = props => (
	<nav className="col-md-2 d-none d-md-block bg-light sidebar sidebar-height">
		<div className="sidebar-sticky">
			<ul className="nav flex-column nav-pills">
				{props.content.map(row => (
					<li key={row.title} className="nav-item ">
						<Link
							to={row.url}
							className={`nav-link ${
								props.location.pathname === row.url
									? 'active'
									: ''
							}`}
						>
							{row.title}
						</Link>
					</li>
				))}
			</ul>
		</div>
	</nav>
);

Sidebar.propTypes = {
	content: PropTypes.arrayOf(PropTypes.object).isRequired,
	location: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withRouter(Sidebar);
