import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dimensions from 'Dimensions';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Button, Header } from 'react-native-elements';
// 
import { RalewayText, RalewayBoldText } from '../../Utilities/RalewayText';
import { fetchRoutineDetails } from '../../Thunks/fetchRoutineDetails';
import * as palette from '../../Utilities/styleIndex';


export class RoutineDetails extends Component {
  constructor() {
    super();
    this.state = { routine: {} };
  }

  static navigationOptions = {
    header: null
  }

  componentDidMount = async () => {
    await this.props.fetchRoutineDetails(this.props.selectedRoutine.id);
  }

  renderExercises(exercises) {
    return exercises.map((exercise, index) => (
      <View key={exercise.id}>

        <View>
          <Text>{exercise.name}</Text>
          <Text>Muscle: <Text>{exercise.muscle}</Text></Text>
          <Text>Equipment: <Text>{exercise.equipment_required}</Text></Text>
        </View>

        <View>
          { exercise.sets && <Text>Sets: <Text>{exercise.sets}</Text></Text> }
          { exercise.reps && <Text>Reps: <Text>{exercise.reps}</Text></Text> }
          { exercise.duration && <Text>Duration: <Text>{exercise.duration}</Text></Text> }
        </View>

        { exercises.length !== index + 1 && <View style={styles.lineBreak}></View> }

      </View>
    ))
  }

  welcomeText = () => {
    return  <Text style={{ fontFamily: 'raleway', fontSize: 24, color: palette.backgroundColor }}>Welcome, 
              <Text style={{ fontFamily: 'raleway-bold', color: palette.darkAccent }}> {this.props.user.name}</Text>
            </Text>
  }

  handleBack = () => {
    this.props.navigation.goBack();
  }

  render() {
    const { semanticDate, loading, selectedRoutine } = this.props;

    return (
      <View style={{ backgroundColor: palette.backgroundColor, height: '100%' }}>
        <Header leftComponent={{ icon: 'chevron-left', color: palette.backgroundColor, onPress: this.handleBack }}
                centerComponent={this.welcomeText()}
                containerStyle={{ backgroundColor: '#FFF', elevation: 12 }} />

        <Text>Viewing { selectedRoutine.data && selectedRoutine.data.attributes.name} routine for {semanticDate}</Text>
        {
          !loading && selectedRoutine.data
            ? <View style={{ width: '80%', backgroundColor: '#FFF', borderRadius: 10 }}>
                <Text>{selectedRoutine.data.attributes.name}</Text>
                <View style={styles.lineBreak}></View>
                { 
                  selectedRoutine.data.attributes.exercises.length
                    ? this.renderExercises(selectedRoutine.data.attributes.exercises)
                    : <Text>No Exercises Found</Text>
                }
              </View>
            : <Text>Loading..</Text>
        }
      </View>
    )
  }
}

export const mapStateToProps = (state) => ({
  selectedRoutine: state.selectedRoutine,
  user: state.user,
  semanticDate: state.semanticDate,
  loading: state.loading
})

export const mapDispatchToProps = (dispatch) => ({
  fetchRoutineDetails: (id) => dispatch(fetchRoutineDetails(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(RoutineDetails);

const styles = StyleSheet.create({

  viewContainer: {

  },

})