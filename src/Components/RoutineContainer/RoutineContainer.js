import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableHighlight } from 'react-native'
import Dimensions from 'Dimensions'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux';
import RoutineCreator from '../RoutineCreator/RoutineCreator'
import { setPreMadeRoutine } from '../../Thunks/setPreMadeRoutine'
import { fetchRoutines } from '../../Thunks/fetchRoutines'

const styles = StyleSheet.create({
  routineContainer: {
    flex: 1,
    paddingTop: 1,
    alignItems: 'center',
    backgroundColor: '#2D71A8',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  container: {
    paddingTop: 60,
    alignItems: 'center'
  },
  scroll: {
    height: Dimensions.get('window').height * .10
  },
  button: {
    marginBottom: 5,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  buttonText: {
    padding: 20,
    color: 'white'
  }
});

export class RoutineContainer extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#FFFFFF',
    },
  };

  constructor() {
    super()
    this.state = {
      routines: [],
      showSelector: true
    }
  }

  async componentDidMount() {
    const url = 'https://warm-cove-89223.herokuapp.com/api/v1/routines';
    const response = await fetch(url);
    const routines = await response.json();
    this.setState({ routines });
  }

  handleChooseRoutine = async (routine, date, user) => {
    await this.props.addPreMadeRoutine(routine, date, user)
    this.props.fetchRoutines(this.props.date, this.props.user)
    this.props.navigation.navigate('homePage')
  }

  handleCreateRoutine = () => {
    this.setState({ showSelector: false })
  }

  displayCards = () => {
    const { routines } = this.state;
    return routines.data && routines.data.length
      ? routines.data.map(routine => {
        return <View key={routine.id} style={styles.container}>
          <TouchableHighlight onPress={() => this.handleChooseRoutine(routine, this.props.date, this.props.user)} underlayColor="white">
            <View style={styles.button}>
              <Text style={styles.buttonText}>{routine.attributes.name}</Text>
            </View>
          </TouchableHighlight>
        </View>
      })
      : <Text>loading...</Text>
  }

  render() {
    return (
      <View style={styles.routineContainer}>
        {this.state.showSelector && 
          <View>
            <View style={styles.container}>
              <Text style={styles.welcomeText}>Select an Existing Routine</Text>
            </View>
            <ScrollView style={styles.scroll}>
              {this.displayCards()}
            </ScrollView>
            <Button onPress={this.handleCreateRoutine} title={'Create New Routine'} />
          </View>
        }
        {!this.state.showSelector && <RoutineCreator />}
      </View>
    )
  }
}

export const mapStateToProps = state => ({
  date: state.date,
  newRoutine: state.newRoutine,
  user: state.user
})

export const mapDispatchToProps = dispatch => ({
  addPreMadeRoutine: (routine, date, user) => dispatch(setPreMadeRoutine(routine, date, user)),
  fetchRoutines: (date, user) => dispatch(fetchRoutines(date, user))
})

export default connect(mapStateToProps, mapDispatchToProps)(RoutineContainer)

