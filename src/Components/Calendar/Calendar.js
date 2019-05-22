import React, { Component } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';

export default class Calendar extends Component {
  constructor() {
    super()
    this.state = {
      exercises: []
    }
  }

  fetchExercises = async () => {
    const url = 'https://warm-cove-89223.herokuapp.com/api/v1/exercises'
    const response = await fetch(url)
    const exercises = await response.json()
    this.setState({ exercises })
  }

  render() {
    return (
      <View style={styles.calendar}>
        <CalendarStrip
          calendarAnimation={{ type: 'sequence', duration: 30 }}
          daySelectionAnimation={{
            type: 'border',
            duration: 200,
            borderWidth: 1,
            borderHighlightColor: '#667D90',
          }}
          style={{ height: 100, marginTop: 50, paddingBottom: 5 }}
          calendarHeaderStyle={{ color: 'white' }}
          calendarColor={'#ACC6D0'}
          dateNumberStyle={{ color: 'white' }}
          dateNameStyle={{ color: 'white' }}
          highlightDateNumberStyle={{ color: '#667D90' }}
          highlightDateNameStyle={{ color: '#667D90' }}
          disabledDateNameStyle={{ color: 'grey' }}
          disabledDateNumberStyle={{ color: 'grey' }}
          iconContainer={{ flex: 0.1 }}
        />
        <Button title='work' onPress={this.fetchExercises}/>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  calendar: {
    paddingTop: 50,
  }
})

