import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dimensions from 'Dimensions';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Card, Icon, ListItem, Button } from 'react-native-elements';
import { RalewayText, RalewayBoldText } from '../../Utilities/RalewayText';
import * as palette from '../../Utilities/styleIndex';


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
          <View style={styles.fullText}>
            <RalewayText style={{color: palette.lightAccent, fontSize: 16}} text="Here's the schedule for" />
            <RalewayBoldText style={{color: '#FFF', fontSize: 16, marginBottom: 10 }} text={semanticDate} />
          </View>
          {
            routines.data.map((routine, index) => (
              <ListItem key={routine.id}
                        containerStyle=
                        {
                          routines.data.length - 1 === index
                            ? {...styles.listItem, marginBottom: 10}
                            : {...styles.listItem}
                        }
                        chevron=
                        {
                          <Icon name='chevron-circle-right'
                                type='font-awesome' 
                                color={palette.backgroundColor} />
                        }
                        bottomDivider={ routines.data.length > 1 ? true : false }
                        title={routine.attributes.name}
                        titleStyle={{ color: palette.backgroundColor, fontFamily: 'raleway' }}
                        subtitle={`${routine.attributes.exercises.length} exercises`}
                        subtitleStyle={{ color: palette.lightAccent, fontFamily: 'raleway' }} />
            ))
          }
          <View style={styles.fullText}>
            <RalewayText  text="Still not tired? Add another routine:" 
                          style={{ color: palette.lightAccent, fontSize: 16, marginTop: 30, marginBottom: 10 }} />
          </View>
          { this.renderButton() }
        </View>
      : <View style={styles.cardContainer}>
          <View style={styles.fullText}>
            <RalewayText style={{color: palette.lightAccent, fontSize: 16}} text="You don't yet have anything scheduled for" />
            <RalewayBoldText style={{color: '#FFF', fontSize: 16, marginBottom: 10 }} text={semanticDate} />
          </View>
          <View style={styles.fullText}>
            <RalewayText  text="Let's Fix That:" 
                          style={{ color: palette.lightAccent, fontSize: 16, marginTop: 30, marginBottom: 10 }} />
          </View>
          { this.renderButton() }
        </View>
  }

  renderButton() {
    return  <View style={{ width: Dimensions.get('window').width - 20 }}>
              <Button  buttonStyle={{ backgroundColor: '#FFF', borderRadius: 10 }}
                    title="Add New Routine" 
                    titleStyle={{ fontFamily: 'raleway-bold', color: palette.backgroundColor }} 
                    icon=
                    {
                      <Icon name='plus'
                            type='font-awesome'
                            size={18}
                            iconStyle={{ position: 'absolute', right: -75 }} 
                            color={palette.backgroundColor} />
                    } 
                    iconRight
                    testID="add-routine-button"
                    onPress={this.handleAddNewRoutine} />
            </View>
  }

  render() {
    const { date, routines, loading } = this.props;

    return loading

      ? <View style={styles.loadingContainer}>
          <Image style={styles.loader} source={require('../../../assets/images/loading.gif')} />
        </View>
        
      : <View>{ this.displayCards() }</View>
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
    height: '100%',
    width: Dimensions.get('window').width,
    backgroundColor: palette.backgroundColor,
    color: '#ACC6D0',
    padding: 20,
    alignItems: 'center'
  },

  loadingContainer: {
    height: '100%',
    width: Dimensions.get('window').width,
    backgroundColor: palette.backgroundColor,
    alignItems: 'center'
  },

  loader: {
    marginTop: 100
  },

  emptyMessage: {
    color: '#ACC6D0',
    fontSize: 16,
  },

  fullText: {
    width: Dimensions.get('window').width - 20
  },

  listItem: {
    backgroundColor: '#FFF', 
    borderRadius: 10,
    width: Dimensions.get('window').width - 20
  }

})
