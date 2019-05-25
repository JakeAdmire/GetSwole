import React from 'react';
import { StyleSheet, Text, View, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { addExercises } from '../../Actions';
import Calendar from '../Calendar/Calendar';
import Dimensions from 'Dimensions';
import Container from '../Container/Container';
import { RalewayText, RalewayBoldText } from '../../Utilities/RalewayText';

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
    const { navigation, date } = this.props;
    return (
      <View style={styles.container}>

        <View style={styles.downwardShadow}>
          <View style={styles.header}>
            <RalewayText style={styles.headerText} text={`Welcome, ${this.props.name}`} />
          </View>

          <View style={styles.prompt}>
            <Text style={styles.promptText}>Select a day to start scheduling workouts</Text>
          </View>
        </View>
        
        <Calendar />
        { 
          date 
            ? <Container navTool={navigation} /> 
            : <View style={styles.placeholder}>
                <Text style={styles.placeholderText}>Please select a date</Text>
              </View>
        }
      </View>
    );
  }
}

export const mapStateToProps = (state) => ({
  name: state.user,
  date: state.date
});

export const mapDispatchToProps = (dispatch) => ({
  addExercises: (exercises) => dispatch(addExercises(exercises))
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);

const styles = StyleSheet.create({

  container: {
    // backgroundColor: '#667D90',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },

  downwardShadow: {
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 12, },
    // shadowOpacity: 0.58,
    // shadowRadius: 16.00,
    elevation: 24,

    width: Dimensions.get('window').width,
    height: 185
  },

  header: {
    backgroundColor: '#7C9DB1',
    height: 70,
    paddingTop: 30,
    paddingBottom: 10,
    paddingLeft: 10,
  },

  headerText: {
    fontSize: 24,
    color: '#FFF',
  },

  prompt: {
    height: 115,
    backgroundColor: '#667D90',
    justifyContent: 'center',
  },

  promptText: {
    color: '#ACC6D0',
    fontSize: 20,
    padding: 10,
  },

  placeholder: {
    backgroundColor: '#667D90',
    height: Dimensions.get('window').height - 185,
    // justifyContent: 'center',
    padding: 30,
    alignItems: 'center',
    elevation: 24,
  },

  placeholderText: {
    fontFamily: 'raleway-bold',
    color: '#ACC6D0',
    fontSize: 30
  }

});
