import React, { Component } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import CalendarStrip from 'react-native-calendar-strip';
import { connect } from 'react-redux'
import Dimensions from 'Dimensions';
import moment from 'moment'
import { RalewayText, RalewayBoldText } from '../../Utilities/RalewayText';
import { setDate, loadRoutines, setSemanticDate } from '../../Actions/index';
import { fetchRoutines } from '../../Thunks/fetchRoutines';
import * as palette from '../../Utilities/styleIndex';


export class Calendar extends Component {

  componentDidMount = () => {
    let originalYear = JSON.stringify(moment().year());
    let originalMonth = JSON.stringify(moment().month() + 1);
    let originalDay = JSON.stringify(moment().date());
    this.determineDate(originalYear, originalMonth, originalDay)
  }

  grabDate = (date) => {
    let slicedDate = JSON.stringify(date).slice(1, 11);
    this.determineDate(slicedDate.slice(0, 4), slicedDate.slice(5, 7), slicedDate.slice(8, 10))
    this.props.setDate(slicedDate);
    this.props.fetchRoutines(slicedDate, this.props.user);
  }

  determineDay = (day) => {
    let dayNum = day.split('')[0] === '0' ? day.slice(1, 2) : day;
    let letters = [ 'th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th' ];
    let lastDigit = day.split('').reverse()[0];
    return `${dayNum}${letters[lastDigit]}`;
  }

  determineMonth = (month) => {
    let monthNum = month.split('')[0] === '0' ? month.slice(1, 2) : month;
    let months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[monthNum - 1];
  }

  determineDate = (year, month, day) => {
    let monthDay = this.determineDay(day);
    let yearMonth = this.determineMonth(month);
    this.props.setSemanticDate(`${monthDay} ${yearMonth} ${year}`);
  }

  render() {
    const { date, semanticDate } = this.props;

    let originalYear = JSON.stringify(moment().year());
    let originalMonth = JSON.stringify(moment().month() + 1);
    let originalDay = JSON.stringify(moment().date());

    return (
      <View>
        <View style={styles.header}>
          <RalewayBoldText style={styles.headerMonth} text=
            {
              semanticDate 
                ? semanticDate.split(' ')[1]
                : this.determineMonth(JSON.stringify(moment().month() + 1))
            }/>
          <RalewayText style={styles.headerDate} text={semanticDate}/>
        </View>
        <View style={styles.accentStrip}></View>
        <CalendarStrip
          calendarAnimation={{ type: 'parallel', duration: 300 }}
          daySelectionAnimation={{ type: 'background', duration: 200, highlightColor: palette.backgroundColor, }}
          style={{ height: 80 }}
          calendarHeaderStyle={{  display: 'none' }}
          calendarColor={palette.darkAccent}

          dateNameStyle={{ color: palette.lightAccent, fontFamily: 'raleway-bold' }}
          dateNumberStyle={{ color: '#FFF', fontFamily: 'raleway' }}

          highlightDateNumberStyle={{ color: '#FFF' }}
          highlightDateNameStyle={{ color: '#FFF' }}
          
          iconLeft={require('../../../assets/images/left-arrow.png')}
          iconRight={require('../../../assets/images/right-arrow.png')}
          onDateSelected={(date) => this.grabDate(date)}
        />
         
      </View>
    )
  }
}

export const mapStateToProps = (state) => ({
  date: state.date,
  semanticDate: state.semanticDate,
  user: state.user
});

export const mapDispatchToProps = (dispatch) => ({
  setDate: (date) => dispatch(setDate(date)),
  setSemanticDate: (date) => dispatch(setSemanticDate(date)),
  fetchRoutines: (date, user) => dispatch(fetchRoutines(date, user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar)

const styles = StyleSheet.create({

  header: {
    backgroundColor: palette.deepAccent,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: 50,
    padding: 10,
  },

  accentStrip: {
    width: Dimensions.get('window').width,
    height: 1,
    backgroundColor: palette.backgroundColor
  },

  headerMonth: {
    color: '#FFF',
    fontSize: 30,
  },

  headerDate: {
    color: '#FFF',
    alignSelf: 'flex-end',
    fontSize: 18,
  },

})
