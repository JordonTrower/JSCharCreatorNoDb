import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
	<nav
		className="navbar navbar-dark bg-dark fixed-top flex-md-nowrap p-0 shadow "
		style={{ flexShrink: 0 }}
	>
		<div className="col-md-12 row">
			<Link to="/" className="navbar-brand col-sm-2 col-md-1 mr-0">
				Cool stuff
			</Link>

			<Link
				to="/character/"
				className="navbar-brand col-sm-2 col-md-1 mr-0"
			>
				Characters
			</Link>
		</div>
	</nav>
);

export default Header;
