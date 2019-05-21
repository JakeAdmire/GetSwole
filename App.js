import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from './src/Reducers/index';
import AppNavigator from './src/AppNavigator';

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