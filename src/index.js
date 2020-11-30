import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import Wrapper from './Wrapper';
import { connect, Provider } from 'react-redux';
import thunk from 'redux-thunk'


import reducer from './redux/reducers';
import { createStore, applyMiddleware, compose } from 'redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)) );

ReactDOM.render((
  <BrowserRouter>
    <Provider store={store}>
      <Wrapper />
    </Provider>
  </BrowserRouter>
), document.getElementById('root'));

serviceWorker.unregister();
