import { Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
export default class App extends Component {
  state = {
    fontLoaded: false,
  };
  
  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    return (
      <Container>
        { this.state.fontLoaded === true && 
        <Header>
        <Left>
          <Button transparent>
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body>
          <Title>Get Swole</Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon name='menu' />
          </Button>
        </Right>
      </Header>
      }
      </Container>
    );
  }
}