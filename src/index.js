import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';
import './index.css';
import StudentDetails from './App';
const rootElement = document.getElementById('root');
render(
    <Provider store={store} >
      <Router history={hashHistory}>
        <Route path="/studentDetails" component={StudentDetails} />
      </Router>
    </Provider>,
    rootElement
  );
