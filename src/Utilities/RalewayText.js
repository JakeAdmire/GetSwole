import React, { Component } from 'react';
import { Text } from 'react-native';

export class RalewayText extends Component {
  
  render() {
    let textStyle = {...this.props.style, fontFamily: 'raleway'};

    return <Text style={textStyle}>{this.props.text}</Text>
  }
}

export class RalewayBoldText extends Component {
  
  render() {
    let textStyle = {...this.props.style, fontFamily: 'raleway-bold'};

    return <Text style={textStyle}>{this.props.text}</Text>
  }
}