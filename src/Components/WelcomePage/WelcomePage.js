import React, { Component } from 'react';
import { Text, View, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Dimensions from 'Dimensions';
import { Button, Input, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
// 
import { RalewayText, RalewayBoldText } from '../../Utilities/RalewayText';
import { addNewUser } from '../../Thunks/addNewUser';
import { palette, flexibleInput, flexibleButton } from '../../Utilities/styleIndex';

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

let windowWidth = Dimensions.get('window').width;

export class WelcomePage extends Component {
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
    let buttonTitle = this.state.showError ? 'First, Enter A Name' : "Submit";

    return (
      <View style={styles.submitButton}>
        { flexibleButton(buttonTitle, 'angle-double-right', 'add-user-button', this.handleSave, 'font-awesome') }
      </View>
    )
  }

  render() {
    let errorMessage = this.state.showError ? "Please Enter A Name First" : "";
    let inputColor = this.state.showError ? palette.deepAccent : palette.lightAccent;

    return (
      <DismissKeyboard>
        <View style={styles.background}>
          <View style={styles.header}>
            <RalewayText text="Welcome To" style={styles.welcomeText} />
            <Text style={styles.getText}>Get<Text style={{ color: palette.lightAccent }}>Swole</Text></Text>
          </View>
          <View style={styles.inputArea}>
            <RalewayText style={styles.promptText} text="What should we call you?" />

            { flexibleInput(inputColor, errorMessage, this.handleChange, 'account-circle', 'ex. Chad...', 'name-input') }
            
          </View>

          { this.renderSubmit() }

        </View>
      </DismissKeyboard>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  addNewUser: (name) => dispatch(addNewUser(name))
});

export default connect(null, mapDispatchToProps)(WelcomePage);

const styles = StyleSheet.create({

  background: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: palette.backgroundColor,
    padding: 20,
  },

  header: {
    flex: 1,
    justifyContent: 'center',
  },

  welcomeText: {
    color: palette.lightAccent,
    fontSize: 20,
  },

  getText: {
    color: '#FFF',
    fontSize: 60,
    marginTop: -10,
    fontFamily: 'raleway-bold',
  },

  inputArea: {
    flex: 1,
    justifyContent: 'center',
    width: windowWidth,
  },

  promptText: {
    fontSize: 20,
    color: palette.lightAccent,
    marginLeft: 20,
  },

  submitButton: {
    flex: 1,
    justifyContent: 'flex-end',
    width: windowWidth - 20,
  },

});
