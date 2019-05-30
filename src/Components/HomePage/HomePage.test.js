import React from 'react';
import { shallow } from 'enzyme';
import { Homepage, mapStateToProps, mapDispatchToProps } from './HomePage';
import { addExercises } from '../../Actions';

describe('HomePage', () => {

  let wrapper;
  let navigationMock = { navigate: jest.fn() };
  let addExercisesMock = jest.fn();
  let userMock = { id: 1, name: 'Jim' };
  let dateMock = '12 05 1997' 

  beforeEach(() => {
    wrapper = shallow(
      <Homepage navigation={navigationMock}
                addExercises={addExercisesMock}
                user={userMock}
                date={dateMock} />
    )
  })

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  describe('handleBackButton()', () => {

    it('should return true', () => {
      let results = wrapper.instance().handleBackButton();

      expect(results).toEqual(true);
    })
  })

  describe('welcomeText()', () => {

    it('should match snapshot', () => {
      let results = wrapper.instance().welcomeText();

      expect(results).toMatchSnapshot();
    })
  })
})

describe('mapStateToProps', () => {

  let mockState = {
    user: 'Joel',
    date: '10 29 12'
  }

  it('should return a props object', () => {
    let results = mapStateToProps(mockState);
    let expected = { user: mockState.user, date: mockState.date };
    expect(results).toEqual(expected);
  })
})

describe('mapDispatchToProps', () => {

  it('should dispatch an addExercises method', () => {
    let mockExercises = [];
    const mockDispatch = jest.fn();
    const actionToDispatch = addExercises(mockExercises);
    const mappedProps = mapDispatchToProps(mockDispatch);
    mappedProps.addExercises(mockExercises);
    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  })

})

