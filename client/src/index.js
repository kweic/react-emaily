import 'materialize-css/dist/css/materialize.min.css'; 
//no relative path, npm assumes you mean an NPM module, from node_modules directory
//this is why no './' before the path

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

//can be used to test from console, make posts
import axios from 'axios';
window.axios = axios;

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

//Provider is a react redux component that knows how to read changes
// informs all children that a new state is available, updates all with new state
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.querySelector('#root')
);
