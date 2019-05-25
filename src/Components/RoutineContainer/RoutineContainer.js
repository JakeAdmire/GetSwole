import React, { Component } from 'react'
import { View, Text, Picker } from 'react-native';
import { Button } from 'react-native-elements';
import Dimensions from 'Dimensions'
import RoutineCreater from '../RoutineCreater/RoutineCreater';

export class RoutineContainer extends Component {
  constructor() {
    super()
    this.state = {
      showSelector: true,
      routines: [],
      pickerValue: ''
    }
  }

  async componentDidMount() {
    const url = 'https://warm-cove-89223.herokuapp.com/api/v1/routines';
    const response = await fetch(url);
    const routines = await response.json();
    this.setState({ routines });
  }

  displayCards = () => {
    const { routines } = this.state;
    return routines.data && routines.data.length
      ? <Picker
        style={{ width: Dimensions.get('window').width }}
        selectedValue={this.state && this.state.pickerValue}
        onValueChange={(value) => {
          this.setState({ pickerValue: value })
          this.handleChooseRoutine(value)
        }}
      >
        {
          routines.data.map(routine => (
            <Picker.Item value={routine} label={routine.attributes.name} key={routine.id} />
          ))
        }
      </Picker>
      : <Text>loading...</Text>
  }

  handleChooseRoutine = (routine) => {
    console.log('Entire single routine', routine)
  }

  handleCreateRoutine = () => {
    this.setState({ showSelector: false })
  }

  render() {
    return (
      <View>
        <Text>Select an Existing Routine</Text>
        {this.displayCards()}
        <Button onPress={this.handleCreateRoutine} title={'Create New Routine'} />
        {!this.state.showSelector && <RoutineCreater />}
      </View>
    )
  }
}

export default RoutineContainer;