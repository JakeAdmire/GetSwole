import React, { Component } from 'react';
import { View, StyleSheet, Text, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import Dimensions from 'Dimensions';
import { palette } from '../../Utilities/styleIndex';

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
      routineName: '',
      showError: false,
      displayedExercises: []
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
      routineName: name,
      showError: false
    });
  }

  saveExercise = (selectedExercise) => {
    let foundExercise;

    if (selectedExercise) {
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
    if (this.state.routineName === '') {
      this.setState({ showError: true })
    } else {
      const url = 'https://warm-cove-89223.herokuapp.com/api/v1/routines?user_id=1';
      const options = {
        method: 'POST',
        body: JSON.stringify({ name: this.state.routineName, exerciseIds }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
      this.props.navTool.navigate('homePage');
    }
  }

  handleSearch = (event) => {
    let searchQuery = event.toLowerCase();
    let displayedExercises = this.state.exercisesCleaned.filter(function (el) {
      let searchValue = el.name.toLowerCase();

      return searchValue.indexOf(searchQuery) !== -1;
    });

    this.setState({
      displayedExercises: displayedExercises.slice(0,10)
    });
  }

  render() {
    return (
      <DismissKeyboard>
        <View style={styles.container}>
          <Text style={styles.introText}>Search and select exercises to create your custom routine:</Text>
          <Input inputContainerStyle={{...styles.nameInput, borderColor: palette.deepAccent}}
            inputStyle={{ marginLeft: 5, color: palette.darkAccent }}
            onChangeText={this.handleSearch}
            placeholder='Search an Exercise' />
            <View style={styles.exerciseList}>
            {
              this.state.displayedExercises.map(exercise => {
                return <Text style={styles.textColor} onPress={() => this.saveExercise(exercise)}>{exercise.name}</Text>
              })
            }
            </View>
          <View style={styles.exercises}>
            <Input placeholder='Enter a Title'
              onChangeText={this.handleChange} />
            {this.state.showError &&
              <Text>Please enter Routine Name</Text>
            }
            {this.state.exerciseList.map(exercise => {
              return <Text key={exercise.id} style={styles.exerciseItem} key={exercise.name}>{exercise.name}</Text>
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
  introText: {
    color: palette.lightAccent,
    fontFamily: 'raleway-bold',
    fontSize: 25,
    marginBottom: 20,
    marginTop: 40
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
  },
  nameInput: {
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderRadius: 50,
  },
  exerciseList: {
    textAlign: 'left',
    backgroundColor: '#ffffff',
    width: Dimensions.get('window').width * .90,
    marginBottom: 20
  },
  textColor: {
    color: palette.darkAccent,
    fontFamily: 'raleway-bold',
    fontSize: 20,
  }
});


export const mapStateToProps = (state) => ({
  exercises: state.exercises,
  user: state.user
})

export default connect(mapStateToProps)(RoutineCreator);
