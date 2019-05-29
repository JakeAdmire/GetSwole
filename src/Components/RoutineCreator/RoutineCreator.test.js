import React from 'react';
import { shallow } from 'enzyme';
import { RoutineCreator, mapStateToProps } from './RoutineCreator';

let mockUser = { name: 'John' }
let exercisesMock = { data: [] };
let semanticDateMock = '25th March, 2019';
let loadingMock = false;

describe('RoutineCreator', () => {

  let wrapper;
  
  beforeEach(() => {
    wrapper = shallow(
      <RoutineCreator exercises={exercisesMock} />
    )
  })

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  describe.skip('componentDidMount', () => {
    it('should call this.exercisesCleaner', () => {
      let mockExercisesCleaner = jest.fn()
      wrapper.instance().componentDidMount()
      expect(mockExercisesCleaner).toHaveBeenCalled()
    })
  })

  describe('handleChange', () => {
    it('should set state with a new routineName and showError: false', () => {
      const mockState = {routineName: '', showError: false}
      const newMockState = {routineName: 'Leg Day', showError: false}
      expect(wrapper.state('routineName')).toEqual(mockState.routineName)
      expect(wrapper.state('showError')).toBe(false)
      wrapper.instance().handleChange('Leg Day')
      expect(wrapper.state('routineName')).toEqual(newMockState.routineName)
      expect(wrapper.state('showError')).toEqual(newMockState.showError)
    })
  })
})

describe('mapStateToProps', () => {
  it('should return a props object', () => {
    let mockState = {
      user: mockUser.name,
      semanticDate: semanticDateMock,
      loading: loadingMock,
      hasError: false,
      exercises: exercisesMock
    };

    let expected = {
      exercises: exercisesMock,
      user: mockUser.name
    }
    let results = mapStateToProps(mockState);
    expect(results).toEqual(expected)
  })

})
