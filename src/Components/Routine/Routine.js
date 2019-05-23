import React, { Component } from 'react'
import { View, Text } from 'react-native'

export class Routine extends Component {
  constructor() {
    super()
    this.state = {
      exercises: []
    }
  }

  render() {
    return (
      <View>
        <Text>Found some stuff!</Text>
      </View>
    )
  }
}

export default Routine