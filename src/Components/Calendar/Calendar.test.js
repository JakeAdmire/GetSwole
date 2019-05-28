import React from 'react';
import { shallow } from 'enzyme';
// 
import { Calendar, mapStateToProps, mapDispatchToProps } from './Calendar';
import { setDate, setSemanticDate } from '../../Actions/index';
import { fetchRoutines } from '../../Thunks/fetchRoutines';

describe('Calendar', () => {

  let wrapper;
  // 
  let setDateMock = jest.fn();
  let fetchRoutinesMock = jest.fn();
  let setSemanticDateMock = jest.fn();
  let dateMock = '';

  beforeEach(() => {
    wrapper = shallow(
      <Calendar setDate={setDateMock}
                fetchRoutines={fetchRoutinesMock}
                setSemanticDate={setSemanticDateMock}
                date={dateMock} />
    )
  })

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  describe('grabDate(date)', () => {

    it('should call determineDate with the correct parameter', () => {

    })

    it('should call setDate and fetchRoutines', () => {

    })

  })

  describe('determineDay(day)', () => {

    it('should return a day string', () => {

    })
    
  })

  describe('determineMonth(month)', () => {

    it('should return a month string', () => {
      
    })
    
  })

  describe('determineDate(year, month, day)', () => {

    it('should call determineDay and determineMonth', () => {

    })

    it('should call setSemanticDate', () => {
      
    })
    
  })

})

describe('mapStateToProps', () => {

  let mockState = {
    date: '12 02 90',
    semanticDate: '15th Mar 2019'
  };

  it('should return a props object', () => {
    let results = mapStateToProps(mockState);

    let expected = { date: mockState.date, semanticDate: mockState.semanticDate };

    expect(results).toEqual(expected);
  })

})

describe('mapDispatchToProps', () => {

  it('should dispatch a setDate method', () => {
    let mockDate = '12 02 10';
    const mockDispatch = jest.fn();
    const actionToDispatch = setDate(mockDate);
    const mappedProps = mapDispatchToProps(mockDispatch);

    mappedProps.setDate(mockDate);

    expect(mockDispatch).toHaveBeenCalled(); // should be toHaveBeenCalledWith()
  })

  it('should dispatch a setSemanticDate method', () => {
    let mockSemanticDate = '15th Mar 2019';
    const mockDispatch = jest.fn();
    const actionToDispatch = setSemanticDate(mockSemanticDate);
    const mappedProps = mapDispatchToProps(mockDispatch);

    mappedProps.setSemanticDate(mockSemanticDate);

    expect(mockDispatch).toHaveBeenCalled();
  })

  it('should dispatch a fetchRoutines method', () => {
    let mockDate = '12 02 10';
    const mockDispatch = jest.fn();
    const actionToDispatch = fetchRoutines(mockDate);
    const mappedProps = mapDispatchToProps(mockDispatch);

    mappedProps.fetchRoutines(mockDate);

    expect(mockDispatch).toHaveBeenCalled();
  })

})