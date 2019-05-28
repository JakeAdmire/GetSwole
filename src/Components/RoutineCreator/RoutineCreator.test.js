import React from 'react';
import { shallow } from 'enzyme';
// 
import { RoutineCreator, mapStateToProps } from './RoutineCreator';

let exercisesMock = { data: [] }; // make this some real shit

describe('RoutineCreator', () => {

  let wrapper;
  // 
  beforeEach(() => {
    wrapper = shallow(
      <RoutineCreator exercises={exercisesMock} />
    )
  })

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

})

describe('mapStateToProps', () => {

  let mockState = {
    exercises: exercisesMock
    // put actual stuff in here
  }

  it('should return a props object', () => {
    let results = mapStateToProps(mockState);
    let expected = { exercises: mockState }

    expect(results).toEqual(expected.exercises)
  })

})
