import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dimensions from 'Dimensions';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Card, Icon, ListItem, Button } from 'react-native-elements';
// 
import { RalewayText, RalewayBoldText } from '../../Utilities/RalewayText';
import { setSelectedRoutine } from '../../Actions';
import { palette, flexibleButton } from '../../Utilities/styleIndex';
import { deleteRoutine } from '../../Thunks/deleteRoutine'
import { fetchRoutines } from '../../Thunks/fetchRoutines'


export class Container extends Component {
  constructor() {
    super();
  }

  handleAddNewRoutine = () => {
    this.props.navTool.navigate('routinePage');
  }

  handleDeleteRoutine = async (routineId) => {
    await this.props.deleteRoutine(this.props.user, routineId, this.props.date)
    this.props.fetchRoutines(this.props.date, this.props.user)
  }
    
  routeToDetails = (id) => {
    this.props.setSelectedRoutine({ id })
    this.props.navTool.navigate('routineDetails');
  }

  displayCards = () => {
    const { routines, semanticDate } = this.props;

    return routines.data && routines.data.length
      ? <View style={styles.cardContainer}>
          <View style={{ width: Dimensions.get('window').width - 20 }}>
            <RalewayText style={{color: palette.lightAccent, fontSize: 16}} text="Here's the schedule for" />
            <RalewayBoldText style={{color: '#FFF', fontSize: 16, marginBottom: 10 }} text={semanticDate} />
          </View>
          {
            routines.data.map((routine, index) => (
              <ListItem key={routine.id}
                        containerStyle={styles.listItem}
                        rightIcon=
                          {{ 
                            name: 'angle-double-right', 
                            type: 'font-awesome', 
                            color: palette.backgroundColor ,
                            onPress: () => this.routeToDetails(routine.id)
                          }}

                        leftIcon=
                          {{
                            name: 'trash',
                            type: 'font-awesome',
                            color: palette.backgroundColor,
                            onPress: () => this.handleDeleteRoutine(routine.id)
                          }}

                        bottomDivider={ routines.data.length > 1 ? true : false }
                        title={routine.attributes.name}
                        titleStyle={{ color: palette.backgroundColor, fontFamily: 'raleway' }}
                        subtitle={`${routine.attributes.exercises.length} exercises`}
                        subtitleStyle={{ color: palette.lightAccent, fontFamily: 'raleway' }} />
            ))
          }
          <View style={{ width: Dimensions.get('window').width - 20 }}>
            <RalewayText  text="Still not tired? Add another routine:" 
                          style={{ color: palette.lightAccent, fontSize: 16, marginTop: 30, marginBottom: 10 }} />
          </View>
          { this.renderButton() }
        </View>
      : <View style={styles.cardContainer}>
          <View style={{ width: Dimensions.get('window').width - 20 }}>
            <RalewayText style={{color: palette.lightAccent, fontSize: 16}} text="You don't yet have anything scheduled for" />
            <RalewayBoldText style={{color: '#FFF', fontSize: 16, marginBottom: 10 }} text={semanticDate} />
          </View>
          <View style={{ width: Dimensions.get('window').width - 20 }}>
            <RalewayText  text="Let's Fix That:" 
                          style={{ color: palette.lightAccent, fontSize: 16, marginTop: 30, marginBottom: 10 }} />
          </View>
          { this.renderButton() }
        </View>
  }

  renderButton() {
    return  <View style={{ width: Dimensions.get('window').width - 20 }}>
              { flexibleButton("Add New Routine", "add-circle-outline", "add-routine-button", this.handleAddNewRoutine) }
            </View>
  }

  render() {
    const { loading } = this.props;

    return loading

      ? <View style={styles.loadingContainer}>
          <Image style={{ marginTop: 100 }} source={require('../../../assets/images/loading.gif')} />
        </View>
        
      : <View>{ this.displayCards() }</View>
  }
}

export const mapStateToProps = (state) => ({
  date: state.date,
  semanticDate: state.semanticDate,
  routines: state.routines,
  loading: state.loading,
  user: state.user
})

export const mapDispatchToProps = (dispatch) => ({
  deleteRoutine: (user, routineId, date) => dispatch(deleteRoutine(user, routineId, date)),
  fetchRoutines: (date, user) => dispatch(fetchRoutines(date, user)),
  setSelectedRoutine: (routine) => dispatch(setSelectedRoutine(routine))
})

export default connect(mapStateToProps, mapDispatchToProps)(Container);

const styles = StyleSheet.create({

  cardContainer: {
    minHeight: Dimensions.get('window').height - 269,
    height: '100%',
    width: '100%',
    backgroundColor: palette.backgroundColor,
    color: '#ACC6D0',
    padding: 20,
    alignItems: 'center'
  },

  loadingContainer: {
    minHeight: Dimensions.get('window').height - 269,
    height: '100%', 
    width: '100%',
    backgroundColor: palette.backgroundColor,
    alignItems: 'center'
  },

  listItem: {
    backgroundColor: '#FFF', 
    borderRadius: 10,
    width: Dimensions.get('window').width - 20,
    marginBottom: 10
  },

})
