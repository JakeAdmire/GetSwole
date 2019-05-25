import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableHighlight } from 'react-native'
import Dimensions from 'Dimensions'
import { connect } from 'react-redux';
import { setPreMadeRoutine } from '../../Thunks/setPreMadeRoutine'

const styles = StyleSheet.create({
  routineContainer: {
    flex: 1,
    paddingTop: 1,
    alignItems: 'center',
    backgroundColor: '#7CABCC',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  container: {
    paddingTop: 60,
    alignItems: 'center'
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
  constructor() {
    super()
    this.state = {
      routines: []
    }
  }

  async componentDidMount() {
    const url = 'https://warm-cove-89223.herokuapp.com/api/v1/routines';
    const response = await fetch(url);
    const routines = await response.json();
    this.setState({ routines });
  }

  handleChooseRoutine = (routine, date) => {
    this.props.addPreMadeRoutine(routine, date)
  }

  displayCards = () => {
    const { routines } = this.state;
    return routines.data && routines.data.length
      ? routines.data.map(routine => {
        return <View style={styles.container}>
          <TouchableHighlight onPress={() => this.handleChooseRoutine(routine, this.props.date)} underlayColor="white">
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
          <View style={styles.container}>
            <Text style={styles.welcomeText}>Select an Existing Routine</Text>
          </View>
          <ScrollView>
            {this.displayCards()}
          </ScrollView>
        </View>
    )
  }
}

export const mapStateToProps = state => ({
  date: state.date,
  newRoutine: state.newRoutine
})

export const mapDispatchToProps = dispatch => ({
  addPreMadeRoutine: (routine, date) => dispatch(setPreMadeRoutine(routine, date))
})

export default connect(mapStateToProps, mapDispatchToProps)(RoutineContainer)

