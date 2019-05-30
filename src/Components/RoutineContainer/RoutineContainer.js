import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableHighlight } from 'react-native'
import Dimensions from 'Dimensions'
import { connect } from 'react-redux';
import RoutineCreator from '../RoutineCreator/RoutineCreator'
import { setPreMadeRoutine } from '../../Thunks/setPreMadeRoutine'
import { fetchRoutines } from '../../Thunks/fetchRoutines'
import { palette, flexibleHeader, flexibleButton } from '../../Utilities/styleIndex';


export class RoutineContainer extends Component {
  static navigationOptions = {
    header: null
  }

  constructor() {
    super()
    this.state = {
      routines: [],
      showSelector: true,
      showCards: false
    }
  }

  componentDidMount() {
    this.handleSetRoutines()
  }

  handleSetRoutines = async () => {
    const url = 'https://warm-cove-89223.herokuapp.com/api/v1/routines';
    const response = await fetch(url);
    const routines = await response.json();
    this.setState({ routines });
  }

  handleChooseRoutine = async (routine, date, user) => {
    await this.props.addPreMadeRoutine(routine, date, user)
    this.props.fetchRoutines(this.props.date, this.props.user)
    this.props.navigation.navigate('homePage')
  }

  handleCreateRoutine = () => {
    this.setState({ showSelector: false })
  }

  displayCards = () => {
    const { routines } = this.state;
    return routines.data && routines.data.length
      ? routines.data.map(routine => {
        return <TouchableHighlight onPress={() => this.handleChooseRoutine(routine, this.props.date, this.props.user)} underlayColor="white">
            <View style={styles.button}>
              <Text style={styles.buttonText}>{routine.attributes.name}</Text>
            </View>
          </TouchableHighlight>
      })
      : <Text>loading...</Text>
  }

  welcomeText = () => {
    return <Text style={{ fontFamily: 'raleway', fontSize: 24, color: palette.backgroundColor }}>Welcome,
              <Text style={{ fontFamily: 'raleway-bold', color: palette.darkAccent }}> {this.props.user.name}</Text>
    </Text>
  }

  handleBack = () => {
    this.props.navigation.goBack();
  }
  handleToggle = () => {
    this.setState({showCards: !this.state.showCards})
  }

  render() {
    return (
      <View style={styles.routineContainer}>
        {flexibleHeader('chevron-left', this.handleBack, this.welcomeText(this.props.user.name), null, null)}
        {this.state.showSelector &&
          <View>
            <View style={styles.container}>
              <Text style={styles.welcomeText}>Schedule a routine to</Text>
              <Text style={styles.welcomeTextTwo}>{this.props.semanticDate}</Text>
            </View>
            <View>
              {flexibleButton('Select a Routine', 'add-circle-outline', 'select-routine', this.handleToggle)}
              <ScrollView style={styles.scroll}>
                {this.state.showCards && this.displayCards()}
              </ScrollView>
              <Text style={styles.or}>OR</Text>
              {flexibleButton('Create Your Own', 'add-circle-outline', 'create-routine', this.handleCreateRoutine)}
            </View>
          </View>
        }
        {!this.state.showSelector && <RoutineCreator navTool={this.props.navigation} />}
      </View>
    )
  }
}

export const mapStateToProps = state => ({
  date: state.date,
  semanticDate: state.semanticDate,
  newRoutine: state.newRoutine,
  user: state.user
})

export const mapDispatchToProps = dispatch => ({
  addPreMadeRoutine: (routine, date, user) => dispatch(setPreMadeRoutine(routine, date, user)),
  fetchRoutines: (date, user) => dispatch(fetchRoutines(date, user))
})

export default connect(mapStateToProps, mapDispatchToProps)(RoutineContainer)

const styles = StyleSheet.create({
  routineContainer: {
    flex: 1,
    paddingTop: 1,
    alignItems: 'center',
    backgroundColor: '#2D71A8',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  container: {
    paddingTop: 60,
    alignItems: 'center'
  },
  scroll: {
    maxHeight: 400,
    marginTop: -20
  },
  button: {
    width: Dimensions.get('window').width,
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderBottomColor: palette.darkAccent,
    borderBottomWidth: 1,
  },
  buttonText: {
    padding: 20,
    color: palette.darkAccent,
  },
  welcomeText: {
    color: palette.lightAccent,
    fontFamily: 'raleway-bold',
    fontSize: 20
  },
  welcomeTextTwo: {
    color: '#FFFFFF',
    fontFamily: 'raleway-bold',
    fontSize: 20
  },
  or: {
    fontSize: 50,
    color: palette.lightAccent,
    fontFamily: 'raleway-bold',
    textAlign: 'center'
  },
  selectText: {
    fontSize: 50,
    color: palette.lightAccent,
    fontFamily: 'raleway-bold',
  }
});
