import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dimensions from 'Dimensions';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Card, Icon, ListItem, Button, ThemeProvider } from 'react-native-elements';
import { RalewayText, RalewayBoldText } from '../../Utilities/RalewayText';

let accentOne = '#7C9DB1';

const theme = {

  colors: {
    primary: accentOne,
  },

  Button: {
    titleStyle: { color: 'white', fontFamily: 'raleway' },
    width: Dimensions.get('window').width - 50,
  }
}

export class Container extends Component {
  constructor() {
    super();
  }

  handleAddNewRoutine = () => {
    this.props.navTool.navigate('routinePage');
  }

  displayCards = () => {

    const { routines, semanticDate } = this.props;

    return routines.data && routines.data.length
      ? <View style={styles.cardContainer}>
          <RalewayText style={styles.emptyMessage} text="Here's the schedule for" />
          <RalewayBoldText style={styles.emptyMessage} text={semanticDate} />
          {
            routines.data.map(routine => (
              <ListItem key={routine.id}
                        containerStyle={{ backgroundColor: '#7C9DB1' }}
                        chevron
                        bottomDivider={ routines.data.length > 1 ? true : false }
                        title={routine.attributes.name}
                        titleStyle={{ color: '#FFF', fontFamily: 'raleway' }}
                        subtitle={`${routine.attributes.exercises.length} exercises`}
                        subtitleStyle={{ color: '#ACC6D0', fontFamily: 'raleway' }} />
            ))
          }
          <Button title="Add New Routine"
                  titleStyle={{ fontFamily: 'raleway' }}
                  raised={false} 
                  onPress={this.handleAddNewRoutine} />
        </View>
      : <View style={styles.cardContainer}>
          <RalewayText style={styles.emptyMessage} text="You don't yet have anything scheduled for" />
          <RalewayBoldText style={styles.emptyMessage} text={semanticDate} />
          <Button title="Add New Routine" 
                  titleStyle={{ fontFamily: 'raleway' }} 
                  raised={false} 
                  onPress={this.handleAddNewRoutine} />
        </View>
  }

  render() {
    const { date, routines, loading } = this.props;

    return loading

      ? <View style={styles.loadingContainer}>
          <Image style={styles.loader} source={require('../../../assets/images/loading.gif')} />
        </View>
        
      : <View>{ this.displayCard() }</View>
  }
}

export const mapStateToProps = (state) => ({
  date: state.date,
  semanticDate: state.semanticDate,
  routines: state.routines,
  loading: state.loading
})

export default connect(mapStateToProps)(Container);

const styles = StyleSheet.create({

  cardContainer: {
    height: Dimensions.get('window').height - 185,
    width: Dimensions.get('window').width,
    backgroundColor: '#667D90',
    color: '#ACC6D0',
    padding: 20
  },

  routineCard: {
    backgroundColor: '#7C9DB1',
    borderWidth: 0
  },

  cardTitle: {
    color: '#FFF',
    fontSize: 20,
    margin: 0,
    alignSelf: 'flex-start',
    fontFamily: 'raleway'
  },

  exerciseContainer: {
    backgroundColor: '#7C9DB1'
  },

  loadingContainer: {
    height: Dimensions.get('window').height - 185,
    width: Dimensions.get('window').width,
    backgroundColor: '#667D90',
    alignItems: 'center'
  },

  loader: {
    marginTop: 100
  },

  emptyMessage: {
    color: '#ACC6D0',
    fontSize: 16,
  },

})
