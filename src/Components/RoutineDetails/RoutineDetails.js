import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
// 
import { fetchRoutineDetails } from '../../Thunks/fetchRoutineDetails';
import { palette, flexibleHeader } from '../../Utilities/styleIndex';


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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>

          <View>
            <Text style={{ fontSize: 16, color: palette.backgroundColor, fontFamily: 'raleway-bold' }}>{exercise.name}</Text>
            <Text style={styles.labelText}>Muscle: 
              <Text style={{ color: palette.lightAccent }}> {exercise.muscle}</Text>
            </Text>
            <Text style={styles.labelText}>Equipment: 
              <Text style={{ color: palette.lightAccent }}> {exercise.equipment_required}</Text>
            </Text>
          </View>

          <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
            { 
              exercise.sets 
                &&  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={styles.labelText}>Sets: </Text>
                      <View style={{ width: 20 }}><Text style={styles.integerStyle}>{exercise.sets}</Text></View>
                    </View> 
            }
            { 
              exercise.reps 
                &&  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={styles.labelText}>Reps: </Text>
                      <View style={{ width: 20 }}><Text style={styles.integerStyle}>{exercise.reps}</Text></View>
                    </View> 
            }
            { 
              exercise.duration 
                &&  <Text style={styles.labelText}>Duration: 
                      <Text> {this.durationConvertor(exercise.duration)}</Text>
                    </Text> 
            }
          </View>
        </View>
          { exercises.length !== index + 1 && <View style={styles.lineBreak}></View> }
      </View>
    ))
  }

  durationConvertor(seconds) {
    if (seconds > 90) {
    let minutes = String(seconds / 60);

    return minutes.includes('.')
      ? `${minutes.split('.')[0]}min ${('.' + minutes.split('.')[1] * 60).slice(1, 3)}sec`
      : minutes + 'min';

    } else {
      return seconds + 'sec';
    }
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
    const { semanticDate, loading, selectedRoutine, user } = this.props;

    return (
      <View style={{ backgroundColor: palette.backgroundColor, height: '100%' }}>

        { flexibleHeader('chevron-left', this.handleBack, this.welcomeText(user.name), null, null) }

        <ScrollView style={{ padding: 20 }}>

          <Text style={{ fontSize: 18, color: palette.lightAccent, fontFamily: 'raleway' }}>Viewing 
            <Text style={{ fontFamily: 'raleway-bold', color: '#FFF' }}> { selectedRoutine.data && selectedRoutine.data.attributes.name} </Text>
          routine for</Text>
          <Text style={{ fontSize: 18, color: '#FFF', fontFamily: 'raleway-bold' }}>{semanticDate}</Text>
          {
            !loading && selectedRoutine.data
              ? <View style={{ width: '100%', backgroundColor: '#FFF', borderRadius: 10, marginTop: 10 }}>
                  <Text style={styles.routineName}>{selectedRoutine.data.attributes.name}</Text>
                  <View style={styles.lineBreak}></View>
                  { 
                    selectedRoutine.data.attributes.exercises.length
                      ? this.renderExercises(selectedRoutine.data.attributes.exercises)
                      : <Text style={styles.splashText}>No Exercises Found</Text>
                  }
                </View>
              : <View style={{ alignItems: 'center' }}>
                  <Image style={{ marginTop: 100 }} source={require('../../../assets/images/loading.gif')} />
                </View>
          }
        </ScrollView>
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

  routineName: { 
    width: '100%', 
    textAlign: 'center', 
    fontSize: 18, 
    fontFamily: 'raleway-bold',
    color: palette.backgroundColor,
    margin: 10
  },

  lineBreak: {
    width: '100%',
    height: 1,
    backgroundColor: palette.lightAccent
  },

  splashText: {
    width: '100%',
    textAlign: 'center', 
    margin: 20, 
    fontFamily: 'raleway-bold'
  },

  labelText: { 
    fontSize: 14, 
    fontFamily: 'raleway', 
    color: palette.backgroundColor,
    marginTop: 10
  },

  integerStyle: {
    color: palette.lightAccent,
    backgroundColor: palette.backgroundColor,
    textAlign: 'center'
  }

})