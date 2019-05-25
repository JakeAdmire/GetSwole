import React, { Component } from 'react'
import { connect } from 'react-redux';
import Dimensions from 'Dimensions'
import { Text, View, StyleSheet } from 'react-native';
import { Card, Button, ThemeProvider } from 'react-native-elements';

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

  handleAddNewRoutine = () => {
    this.props.navTool.navigate('routinePage');
  }

  displayCards = () => {
    const { routines } = this.props
    return routines.data && routines.data.length
      ? routines.data.map(routine => (
        <View title={routine.id}>
          <Card >
              <Text>{routine.attributes.name}</Text>
            {
              routine.attributes.exercises.map(exercise => (
                  <Text key={exercise.id}>{exercise.name}</Text>
              ))
            }
          </Card>
          <ThemeProvider theme={theme}>
            <Button title="Add New Routine" raised={false} onPress={this.handleAddNewRoutine} />
          </ThemeProvider>
        </View>
      ))
      : <View>
          <Text>No Routines Scheduled Yet</Text>
          <Button title="Add New Routine" raised={false} onPress={this.handleAddNewRoutine} />
        </View>
  }

  render() {
    const { date, routines, loading } = this.props;

    return loading
      ? <Text>loading..</Text>
      : <View>
        {this.displayCards()}
      </View>
  }
}

export const mapStateToProps = (state) => ({
  date: state.date,
  routines: state.routines,
  loading: state.loading
})

export default connect(mapStateToProps)(Container);
