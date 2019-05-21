import React from 'react';
import { StyleSheet, Text, View, BackHandler } from 'react-native';
import { connect } from 'react-redux';

class Homepage extends React.Component {
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

    return (
      <View style={styles.container}>
        <Text>Hello, {this.props.name}</Text>
      </View>
    );
  }
}

export const mapStateToProps = (state) => ({
  name: state.user
});

export default connect(mapStateToProps)(Homepage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});