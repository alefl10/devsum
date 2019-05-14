import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import './index.css';

// eslint-disable-next-line no-undef
ReactDOM.render(<Provider store={store}><Router><App /></Router></Provider>, document.getElementById('root'));
