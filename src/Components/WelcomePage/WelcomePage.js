import React, { Component } from 'react';
import { Text, View, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Dimensions from 'Dimensions';
import { Button, Input, Icon } from 'react-native-elements';
import { connect } from 'react-redux';

// import { addUser } from '../../Actions';
import { RalewayText, RalewayBoldText } from '../../Utilities/RalewayText';
import { addUserThunk } from '../../Thunks/addUserThunk';
import * as palette from '../../Utilities/styleIndex';

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

let windowHeight = Dimensions.get('window').height;
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
    let buttonIcon = this.state.showError ? { right: -70 } : { right: -125 };

    return (
      <View style={styles.submitButton}>
        <Button buttonStyle={{...styles.dropShadow, backgroundColor: '#FFF', position: 'relative', borderRadius: 10 }}
                title={buttonTitle} 
                titleStyle={{ fontFamily: 'raleway-bold', fontSize: 20, color: palette.darkAccent }} 
                icon=
                {
                  <Icon name='angle-double-right'
                        type="font-awesome"
                        size={25}
                        iconStyle={{...buttonIcon, position: 'absolute' }} 
                        color={palette.darkAccent} />
                } 
                iconRight
                // raised
                testID='add-user-button'
                onPress={this.handleSave} />
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
            <Input  inputContainerStyle={{...styles.nameInput, borderColor: inputColor}}
                    inputStyle={{ marginLeft: 5, color: palette.lightAccent }}
                    errorMessage={errorMessage} 
                    errorStyle={{ color: palette.deepAccent, paddingLeft: 10, fontFamily: 'raleway' }}
                    onChangeText={this.handleChange} 
                    leftIcon={{ name: 'account-circle', color: inputColor }}
                    placeholder='ex. Chad...'
                    testID='name-input' />
          </View>
          { 
            this.renderSubmit() 
          }
        </View>
      </DismissKeyboard>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  addNewUser: (name) => dispatch(addUserThunk(name))
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
    marginLeft: 20
  },

  nameInput: {
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderRadius: 50,
  },

  submitButton: {
    flex: 1,
    justifyContent: 'flex-end',
    width: windowWidth - 20,
  },

  dropShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1, },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  }

});
