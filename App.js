import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from './src/Reducers/index';
import AppNavigator from './src/AppNavigator';
import { Font, AppLoading } from "expo";

const store = createStore(rootReducer);

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
