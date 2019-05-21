import React, { Component } from 'react';
import Header from '../Header/Header';
import { View } from 'react-native';
import WelcomePage from '../WelcomePage/WelcomePage';

export default class App extends Component {

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header backgroundColor="#7CABCC"
          barStyle="light-content" />
        <WelcomePage />
      </View>
    );
  }
}