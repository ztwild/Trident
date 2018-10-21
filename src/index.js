import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import registerServiceWorker from './registerServiceWorker';
import Routes from './routes';
import './index.css';
import './App.css';

render(
  <Provider store={store}>
    <Routes/>
  </Provider>, 
  window.document.getElementById('app'));
registerServiceWorker();