import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from '../../Reducers/index';
import AppNavigator from '../../AppNavigator';

const store = createStore(rootReducer);

export default class App extends Component {
  
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}