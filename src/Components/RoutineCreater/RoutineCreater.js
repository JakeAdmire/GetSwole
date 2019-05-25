import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { InputAutoSuggest } from 'react-native-autocomplete-search';


export class RoutineCreater extends Component {
  constructor() {
    super();
    this.state = {
      exercisesCleaned: [],
      selectedExercise: {},
      exerciseList: []
    }
  }

  componentDidMount() {
    this.exercisesCleaner();
  }

  exercisesCleaner = () => {
    let cleanedArray = [];
    this.props.exercises.data.forEach(exercise => {
      cleanedArray.push({ id: exercise.id, name: exercise.attributes.name })
    });
    this.setState({ exercisesCleaned: cleanedArray })
  }

  saveExercise = () => {
    const { selectedExercise } = this.state;
    let foundExercise = this.props.exercises.data.find(exercise => {
      return exercise.attributes.name === selectedExercise.name
    });
    if (foundExercise) {
      this.setState({ exerciseList: [...this.state.exerciseList, foundExercise.id] })
    }
  }

  saveRoutine = () => {

  }

  render() {
    return (
      <View>
        <InputAutoSuggest
          style={{ flex: 1 }}
          staticData={this.state.exercisesCleaned}
          onDataSelectedChange={data => this.setState({ selectedExercise: data })}
        />
        <Button title='Add Exercise to Routine' onPress={this.saveExercise} />
        <Button title='Add Routine' onPress={this.saveRoutine} />
      </View>
    )
  }
}


export const mapStateToProps = (state) => ({
  exercises: state.exercises
})


export default connect(mapStateToProps)(RoutineCreater);
