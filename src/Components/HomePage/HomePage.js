import React from 'react';
import { StyleSheet, Text, View, BackHandler } from 'react-native';

export default class Homepage extends React.Component {
  static navigationOptions = {
    header: null
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    BackHandler.exitApp();
    return true;
  };

  render() {
    const { navigation } = this.props;
    const name = navigation.getParam('name');

    return (
      <View style={styles.container}>
        <Text>Hello {name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});