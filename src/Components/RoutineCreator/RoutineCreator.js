import React, { Component } from 'react';
import { View, StyleSheet, Text, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { InputAutoSuggest } from 'react-native-autocomplete-search';
import Dimensions from 'Dimensions';

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

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
    let foundExercise;

    if(selectedExercise) {
      foundExercise = this.props.exercises.data.find(exercise => {
        return exercise.attributes.name === selectedExercise.name
      });
    }

    if (foundExercise) {
      this.setState({ exerciseList: [...this.state.exerciseList, { id: foundExercise.id, name: selectedExercise.name }] })
    }
  }

  saveRoutine = async () => {
    const exerciseIds = this.state.exerciseList.map(exercise => {
      return exercise.id
    });
    const url = `https://warm-cove-89223.herokuapp.com/api/v1/routines?user_id=${this.props.user.id}`;
    const options = {
      method: 'POST',
      body: JSON.stringify({ name: 'swolio', exerciseIds }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const response = await fetch(url, options)
  }

  render() {
    return (
      <DismissKeyboard>
        <View style={styles.container}>
          <InputAutoSuggest
            inputStyle={styles.input}
            itemTextStyle={styles.item}
            staticData={this.state.exercisesCleaned}
            onDataSelectedChange={data => this.setState({ selectedExercise: data })}
          />
          <Button titleStyle={styles.text}
            buttonStyle={styles.button}
            title='Add Exercise to Routine'
            onPress={this.saveExercise} />
          <View>
            {this.state.exerciseList.map(exercise => {
              return <Text style={styles.text} key={exercise.name}>{exercise.name}</Text>
            })}
          </View>
          <Button titleStyle={styles.text}
            buttonStyle={styles.button}
            title='Create New Routine'
            onPress={this.saveRoutine} />
        </View>
      </DismissKeyboard>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#667D90',
    height: 400,
    width: Dimensions.get('window').width,
    alignItems: 'center'
  },
  item: {
    color: '#667D90',
    backgroundColor: '#ACC6D0',
    fontFamily: 'raleway-bold'
  },
  input: {
    color: '#FFFFFF',
    backgroundColor: '#7C9DB1',
    fontFamily: 'raleway-bold',
    width: Dimensions.get('window').width * .90,
    marginTop: 60,
    height: 40
  },
  button: {
    backgroundColor: '#7C9DB1',
    width: Dimensions.get('window').width * .90
  },
  text: {
    fontFamily: 'raleway-bold',
    color: '#FFFFFF'
  }
});


export const mapStateToProps = (state) => ({
  exercises: state.exercises,
  user: state.user
})

export default connect(mapStateToProps)(RoutineCreator);
