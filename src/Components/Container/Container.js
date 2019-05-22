import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Text, View } from 'react-native'

export class Container extends Component  {
  render () {
    return (
      <View>
        <Text></Text>
      </View>
    )
  }
}

export const mapStateToProps = (state) => ({
  date: state.date
})

export default connect(mapStateToProps)(Container)