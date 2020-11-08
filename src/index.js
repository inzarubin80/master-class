import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './bootstrap.css';


import App from './App';
import reportWebVitals from './reportWebVitals';


import { Provider } from 'react-redux';
import {createStore, applyMiddleware} from 'redux';

import thunk from 'redux-thunk'
import rootReducer from './redux/rootReducer';
import { initAuth } from './redux/user/userActions';

const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

const store = createStore(rootReducer, applyMiddleware(thunk));

store.dispatch(initAuth());

ReactDOM.render(<Provider store={store}> 
  <App/>
</Provider> , document.getElementById('root'));
reportWebVitals();
