import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom';
import './Client/CSS/index.css';
import Master from './Client/Components/Master';
import registerServiceWorker from './Client/registerServiceWorker';

ReactDOM.render(<Master />, document.getElementById('root')); // eslint-disable-line
registerServiceWorker();
