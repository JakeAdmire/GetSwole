import AppNavigator from './src/AppNavigator';
import React, { Component } from 'react';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import { Font, AppLoading } from "expo";
import { Provider } from 'react-redux';
import { rootReducer } from './src/Reducers/index';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));


export default class App extends Component {
  state = { fontLoaded: false, };

  async componentDidMount() {
    await Font.loadAsync({
      'raleway': require('./assets/fonts/Raleway-Regular.ttf'),
      'raleway-bold': require('./assets/fonts/Raleway-SemiBold.ttf'),
    });
    this.setState({ fontLoaded: true });
  }
  
  render() {

    return this.state.fontLoaded
      ? (
        <Provider store={store}>
          <AppNavigator />
        </Provider>
      )
      : <AppLoading />
  }
}
