import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements'

export class Container extends Component  {
  constructor() {
    super()
    this.state = {
      routines: {}
    }
  }

  async componentDidMount() {
    const { date } = this.props
    const cleanDate = date.slice(0, 11)
    const url = `https://warm-cove-89223.herokuapp.com/api/v1/my_routines?date=${cleanDate}&id=1`
    const response = await fetch(url)
    const routines = await response.json()
    await this.setState({ routines }) 
  }

  displayCards = () => {
    const { routines } = this.state;
    return routines.data
      ? routines.data[0].attributes.exercises.map(exercise => (
        <View>
          <Card>
            <Text>{exercise.name}</Text>
            <Text>{exercise.category}</Text>
          </Card>
        </View>
      ))
      : <Text>TEXT</Text>
  }

  render () {
    return this.displayCards()
  }
}

export const mapStateToProps = (state) => ({
  date: state.date
})

export default connect(mapStateToProps)(Container)