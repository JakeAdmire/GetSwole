import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Dimensions from 'Dimensions';
import { ThemeProvider, Button } from 'react-native-elements';
import { addUser } from '../../Actions';
import { connect } from 'react-redux';
import { RalewayText, RalewayBoldText } from '../../Utilities/RalewayText';
import { addUserThunk } from '../../Thunks/addUserThunk'

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

let themeColor = '#667D90';
let accentOne = '#7C9DB1';
let accentTwo = '#ACC6D0';
let windowHeight = Dimensions.get('window').height;
let windowWidth = Dimensions.get('window').width;

const theme = {

  colors: {
    primary: accentOne,
  },

  Button: {
    titleStyle: { color: 'white', fontFamily: 'raleway' },
    width: Dimensions.get('window').width - 50,
  },

}

class WelcomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      showError: false
    }
  }

  static navigationOptions = {
    header: null
  }

  handleChange = (name) => {
    this.setState({ 
      userName: name, 
      showError: false 
    });
  }

  handleSave = () => {
    const { userName } = this.state;

    if (userName) {
      this.props.addNewUser(userName);
      this.props.navigation.navigate('MainApp');
    } else {
      this.setState({showError: true});
    }
  }

  renderSubmit = () => {
    let buttonTitle = this.state.showError ? 'First, Enter A Name' : "Let's Get Started";

    return (
      <ThemeProvider theme={theme}>
        {
          this.state.userName
            ? <Button title={buttonTitle} raised={false} onPress={this.handleSave} />
            : <Button title={buttonTitle} raised={false} onPress={this.handleSave} />
        }
      </ThemeProvider>
    )
  }

  render() {
    return (
      <DismissKeyboard>
        <View style={styles.background}>
          <View style={styles.header}>
            <RalewayText text="Welcome To" style={styles.welcomeText} />
            <Text style={styles.getText}>Get<Text style={styles.swoleText}>Swole</Text></Text>
          </View>
          <View style={styles.inputArea}>

            <RalewayText style={styles.promptText} text="What should we call you?" />
            <TextInput style={styles.textBox} onChangeText={this.handleChange} placeholder=' ex. Chad...' />
          </View>
          <View style={styles.submitButton}>
          { 
            this.renderSubmit() 
          }
          </View>
        </View>
      </DismissKeyboard>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  addNewUser: (name) => dispatch(addUserThunk(name))
});

export const mapStateToProps = state => ({
  exercises: state.exercises,
  user: state.user
})

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);


const styles = StyleSheet.create({

  background: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: themeColor,
    padding: 20,
  },

  header: {
    flex: 1,
    justifyContent: 'center',
  },

  welcomeText: {
    color: accentTwo,
    fontSize: 20,
  },

  getText: {
    color: '#FFF',
    fontSize: 60,
    marginTop: -10,
    fontFamily: 'raleway-bold',
  },

  swoleText: {
    color: accentTwo,
  },

  inputArea: {
    flex: 1,
    justifyContent: 'center',
    width: windowWidth - 50,
  },

  promptText: {
    fontSize: 20,
    color: accentTwo,
  },

  textBox: {
    backgroundColor: accentOne,
    height: 40,
    fontSize: 20,
    color: '#FFF',
    padding: 5,
  },

  submitButton: {
    flex: 1,
    justifyContent: 'flex-end',
    width: windowWidth - 50,
  }

});
