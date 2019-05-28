import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { InputAutoSuggest } from 'react-native-autocomplete-search';

export class RoutineCreator extends Component {
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
      this.setState({ exerciseList: [...this.state.exerciseList, {id: foundExercise.id, name: selectedExercise.name}] })
    }
  }

  saveRoutine = () => {

  }

  render() {
    return (
      <View style={styles.container}>
        <InputAutoSuggest
          style={{ flex: 1 }}
          inputStyle={styles.input}
          itemTextStyle={styles.item}
          staticData={this.state.exercisesCleaned}
          onDataSelectedChange={data => this.setState({ selectedExercise: data })}
        />
        <Button title='Add Exercise to Routine' onPress={this.saveExercise} />
        <View>
          {this.state.exerciseList.map(exercise => {
            return <Text>{exercise.name}</Text>
          })}
        </View>
        <Button title='Create New Routine' onPress={this.saveRoutine} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#667D90',
    height: 400
  },
  item: {
    color: '#FFFFFF',
    backgroundColor: '#ACC6D0'
  },
  input: {
    color: '#667D90',
    backgroundColor: '#ACC6D0'
  }
});


export const mapStateToProps = (state) => ({
  exercises: state.exercises
})

export default connect(mapStateToProps)(RoutineCreator);
