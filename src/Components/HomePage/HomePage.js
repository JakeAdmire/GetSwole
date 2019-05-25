import React from 'react';
import { StyleSheet, Text, View, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { addExercises } from '../../Actions';
import Calendar from '../Calendar/Calendar';
import Dimensions from 'Dimensions';

class Homepage extends React.Component {
  static navigationOptions = {
    header: null
  }

  async componentDidMount() {
    const response = await fetch('https://warm-cove-89223.herokuapp.com/api/v1/exercises');
    const data = await response.json();
    this.props.addExercises(data)
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
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Text>Hello, {this.props.name}</Text>
        <Text>Select a day to view it's routines!</Text>
        <Calendar navTool={navigation} />
      </View>
    );
  }
}

export const mapStateToProps = (state) => ({
  name: state.user
});

export const mapDispatchToProps = (dispatch) => ({
  addExercises: (exercises) => dispatch(addExercises(exercises))
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7CABCC',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
});