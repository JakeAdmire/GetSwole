import React, { Component } from 'react';
import { View, StyleSheet, Text, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Button, Input } from 'react-native-elements';
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
      exerciseList: [],
      RoutineName: ''
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

  handleChange = (name) => {
    this.setState({ 
      RoutineName: name, 
    });
  }

  saveExercise = () => {
    console.log('oi')
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
    const url = 'https://warm-cove-89223.herokuapp.com/api/v1/routines?user_id=1';
    const options = {
      method: 'POST',
      body: JSON.stringify({ name: this.state.RoutineName, exerciseIds }),
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
            buttonStyle={styles.addButton}
            title='Add Exercise to Routine'
            onPress={this.saveExercise} />
          <View style={styles.exercises}>
            <Input placeholder='Enter a name for routine'
                   onChangeText={this.handleChange}/>
            {this.state.exerciseList.map(exercise => {
              return <Text style={styles.exerciseItem} key={exercise.name}>{exercise.name}</Text>
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
    backgroundColor: '#2D71A8',
    height: 400,
    width: Dimensions.get('window').width,
    alignItems: 'center'
  },
  item: {
    color: '#2D71A8',
    backgroundColor: '#FFFFFF',
    fontFamily: 'raleway-bold'
  },
  input: {
    color: '#53CFFF',
    backgroundColor: '#FFFFFF',
    fontFamily: 'raleway-bold',
    width: Dimensions.get('window').width * .90,
    marginTop: 30,
    height: 40,
  },
  button: {
    backgroundColor: '#FFFFFF',
    width: Dimensions.get('window').width * .90,
    borderRadius: 10,
    marginTop: 20,
    height: 40
  },
  text: {
    fontFamily: 'raleway-bold',
    color: '#2D71A8',
  },
  exercises: {
    backgroundColor: '#FFFFFF',
    width: Dimensions.get('window').width * .90,
  },
  exerciseItem: {
    color: '#2D71A8',
    marginLeft: 10,
    fontSize: 20
  },
  addButton: {
    backgroundColor: '#FFFFFF',
    width: Dimensions.get('window').width * .90,
    borderRadius: 10,
    height: 40,
    marginBottom: 10
  }
});


export const mapStateToProps = (state) => ({
  exercises: state.exercises,
  user: state.user
})

export default connect(mapStateToProps)(RoutineCreator);
