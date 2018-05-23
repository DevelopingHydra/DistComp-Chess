import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import App from './container/App';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
