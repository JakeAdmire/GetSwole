import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';
// 
import { fetchRoutines } from '../../Thunks/fetchRoutines';

export class Container extends Component  {

  displayCards = () => {
    const { routines } = this.props;
    return routines.data && routines.data.length
      ? routines.data.map(routine => (
        <View key={routine.id}>
          <Card>
            <Text>{routine.attributes.name}</Text>
            {
              routine.attributes.exercises.map(exercise => (
                <Text key={exercise.id}>{exercise.name}</Text>
              ))
            }
          </Card>
        </View>
      ))
      : <Text>No routines scheduled for this day</Text>
  }

  render () {
    const { date, routines, loading } = this.props;

    return loading
      ? <Text>loading..</Text>
      : <View>{ this.displayCards() }</View>
  }
}

export const mapStateToProps = (state) => ({
  date: state.date,
  routines: state.routines,
  loading: state.loading
})

export default connect(mapStateToProps, null)(Container);
