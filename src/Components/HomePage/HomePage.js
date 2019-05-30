import React from 'react';
import { StyleSheet, Text, View, BackHandler, ScrollView } from 'react-native';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';
import Dimensions from 'Dimensions';
// 
import { addExercises } from '../../Actions';
import Calendar from '../Calendar/Calendar';
import Container from '../Container/Container';
import { palette, flexibleHeader } from '../../Utilities/styleIndex';

export class Homepage extends React.Component {
  static navigationOptions = {
    header: null
  }

  componentDidMount() {
    this.handleAddExercises()
  }

  handleAddExercises = async () => {
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

  welcomeText = () => {
    return  <Text style={styles.headerText}>Welcome, 
              <Text style={{ fontFamily: 'raleway-bold', color: palette.darkAccent }}> {this.props.user.name}</Text>
            </Text>
  }

  render() {
    const { navigation, date } = this.props;
    return (
      <View style={styles.HomePage}>

        { flexibleHeader(null, null, this.welcomeText) }

        <ScrollView bounces>
          <View style={styles.prompt}>
            <Text style={styles.promptText}>Select a day to start scheduling workouts</Text>
          </View>

          <Calendar />
          { 
            date 
              ? <View>
                  <Container navTool={navigation} />
                </View>
              : <View style={styles.placeholder}>
                  <Text style={styles.placeholderText}>Please select a date</Text>
                </View>
          }
        </ScrollView>

      </View>
    );
  }
}

export const mapStateToProps = (state) => ({
  user: state.user,
  date: state.date
});

export const mapDispatchToProps = (dispatch) => ({
  addExercises: (exercises) => dispatch(addExercises(exercises))
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);

const styles = StyleSheet.create({

  HomePage: {
    width: '100%',
    height: '100%',
  },

  headerText: {
    fontFamily: 'raleway',
    fontSize: 24,
    color: palette.backgroundColor,
  },

  prompt: {
    height: 100,
    backgroundColor: palette.backgroundColor,
    justifyContent: 'center',
    elevation: 11
  },

  promptText: {
    color: palette.lightAccent,
    fontSize: 20,
    padding: 10,
  },

  placeholder: {
    backgroundColor: palette.backgroundColor,
    minHeight: Dimensions.get('window').height - 269,
    height: '100%',
    padding: 30,
    alignItems: 'center'
  },

  placeholderText: {
    fontFamily: 'raleway-bold',
    color: palette.lightAccent,
    fontSize: 30
  }

});
