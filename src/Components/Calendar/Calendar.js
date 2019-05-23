import React, { Component } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { connect } from 'react-redux'
import CalendarStrip from 'react-native-calendar-strip';
// 
import { addDateToStore, loadRoutines } from '../../Actions/index'
import { fetchRoutines } from '../../Thunks/fetchRoutines';
import Container from '../Container/Container';

export class Calendar extends Component {

  grabDate = (date) => {
    let slicedDate = JSON.stringify(date).slice(1, 11);
    this.props.addDateToStore(slicedDate);
    this.props.fetchRoutines(slicedDate);
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
          onDateSelected={(date) => this.grabDate(date)}
        />
        { 
          this.props.date 
            ? <Container /> 
            : <Text>Please select a date.</Text> 
        } 
      </View>
    )
  }
}

export const mapStateToProps = (state) => ({
  date: state.date
});

export const mapDispatchToProps = (dispatch) => ({
  addDateToStore: (date) => dispatch(addDateToStore(date)),
  fetchRoutines: (date) => dispatch(fetchRoutines(date))
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar)

const styles = StyleSheet.create({

  calendar: {
    paddingTop: 50,
  },

})
