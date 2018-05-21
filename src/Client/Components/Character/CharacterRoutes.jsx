import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CharacterCreator from './Create';
import CharacterIndex from './Index';
import CharacterView from './View';
import Sidebar from '../Common/Sidebar';

const CharacterRoutes = () => (
	<BrowserRouter>
		<div className="row">
			<Sidebar
				content={[
					{
						url: '/character/',
						title: 'Index'
					},
					{
						url: '/character/create',
						title: 'Create Character'
					}
				]}
			/>
			<main role="main" className="col-md-10" style={{ paddingLeft: 0 }}>
				<Switch>
					<Route
						exact
						path="/character/"
						component={CharacterIndex}
					/>
					<Route
						path="/character/create"
						component={CharacterCreator}
					/>
					<Route
						path="/character/view/:id"
						component={CharacterView}
					/>
				</Switch>
			</main>
		</div>
	</BrowserRouter>
);

export default CharacterRoutes;
