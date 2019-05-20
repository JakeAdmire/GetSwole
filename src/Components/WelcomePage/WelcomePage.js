import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import Dimensions from 'Dimensions';
import { ThemeProvider, Button } from 'react-native-elements';

const theme = {
  colors: {
    primary: '#D3E2EB',
  },
  Button: {
    titleStyle: {
      color: 'black',
    },
  }
}


export default class WelcomePage extends Component {
  constructor() {
    super();
    this.state = {
      userInfo: {}
    }
  }

  render() {
    return (
      <View style={styles.background}>
        <View>
          <Text style={styles.headerTextOne}>Welcome to</Text>
          <Text style={styles.headerTextTwo}>Get<Text style={styles.headerTextThree}>Swole</Text></Text>
          <Text style={styles.headerTextFour}>What should we call you?</Text>
          <TextInput style={styles.textBox} placeholder=' ex. Chad...' />
          <ThemeProvider theme={theme}>
            <Button title="Let's get started" raised={true} />
          </ThemeProvider>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  background: {
    alignItems: 'center',
    paddingTop: 200,
    backgroundColor: '#7CABCC',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  headerTextOne: {
    color: '#D3E2EB',
    fontSize: 30,
    marginLeft: -12
  },
  headerTextTwo: {
    color: '#ffffff',
    fontSize: 70,
    marginTop: -10,
    marginBottom: 50
  },
  headerTextThree: {
    color: '#D3E2EB',
  },
  headerTextFour: {
    fontSize: 20,
    color: '#D3E2EB',
    marginBottom: -15
  },
  textBox: {
    backgroundColor: '#ffffff',
    height: 40,
    fontSize: 25,
    marginTop: 20,
    marginBottom: 20
  }
});