import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './Common/Header';
import Index from './Index';
import '../CSS/App.css';
import CharacterRoutes from './Character/CharacterRoutes';

const App = () => (
	<BrowserRouter>
		<div className="">
			<Header />
			<div className="container-fluid">
				<Switch>
					<Route exact path="/" component={Index} />
					<Route path="/character" component={CharacterRoutes} />
				</Switch>
			</div>
		</div>
	</BrowserRouter>
);
export default App;
