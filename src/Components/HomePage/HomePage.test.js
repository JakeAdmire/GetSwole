<<<<<<< HEAD
import React from 'react'
import { shallow } from 'enzyme'
import { Homepage, mapStateToProps, mapDispatchToProps } from './Homepage'
import { addExercises } from '../../Actions'

describe('Homepage', () => {

  let wrapper;
  let mockDate = '2019 5 25';
  let semanticDateMock = '25th March, 2019';
  let loadingMock = false;
  let mockUser = { name: 'John' }
  let routinesMock = {
    data: [
      {
        id: "4",
        type: "routine",
        attributes: {
          name: "Arm Day",
          exercises: [
            {
              id: 50,
              name: "Pushups",
              category: "Strength",
              equipment_required: "Body Only",
              muscle: "Chest",
              reps: 10,
              sets: 4,
              duration: null,
              weight: null
            },
            {
              id: 70,
              name: "Chin-Up",
              category: "Strength",
              equipment_required: "Body Only",
              muscle: "Lats",
              reps: 5,
              sets: 4,
              duration: null,
              weight: null
            },
            {
              id: 104,
              name: "Barbell Curl",
              category: "Strength",
              equipment_required: "Barbell",
              muscle: "Biceps",
              reps: 10,
              sets: 4,
              duration: null,
              weight: null
            }
          ]
        }
      }
    ]
  };
  beforeEach(() => {
    wrapper = shallow(<Homepage />)
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
    let date = { date: '2019 05 29' }
    wrapper.setProps({ date })
    expect(wrapper).toMatchSnapshot()
  })


  describe('mapDispatchToProps', () => {
    it('should dispatch ADD EXERCISES if the props function is triggered', () => {
      const mockDispatch = jest.fn()
      const mockExercises = {
        exercises: [
          {
            id: 50,
            name: "Pushups",
            category: "Strength",
            equipment_required: "Body Only",
            muscle: "Chest",
            reps: 10,
            sets: 4,
            duration: null,
            weight: null
          }
        ]
      }
      const actionToDispatch = addExercises(mockExercises)
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.addExercises(mockExercises)
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })
  describe.skip('mapStateToProps', () => {
    it('should map State to Props', () => {
      let mockState = {
        name: 'Helen',
        date: mockDate,
        semanticDate: semanticDateMock,
        routines: routinesMock,
        loading: loadingMock
      };
      let mockUpdatedState = {
        name: 'Helen',
        date: mockDate,
      }
      const results = mapStateToProps(mockState)
      expect(results).toEqual(mockUpdatedState)
    })
  })

  describe('componentDidMount', () => {
    it('should call handleAddExercises', () => {
      const instance = wrapper.instance()
      jest.spyOn(instance, 'handleAddExercises')
      instance.componentDidMount()
      expect(instance.handleAddExercises).toHaveBeenCalled()
    })
  })
  
})
=======
import React from 'react';
import { shallow } from 'enzyme';
// 
import { Homepage, mapStateToProps, mapDispatchToProps } from './HomePage';
import { addExercises } from '../../Actions';

describe('HomePage', () => {

  let wrapper;
  // 
  let navigationMock = { navigate: jest.fn() };
  let addExercisesMock = jest.fn();
  let userMock = { id: 1, name: 'Jim' };
  let dateMock = '12 05 1997' // ?

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
>>>>>>> dd8075c0cc4d7abb498ef17e217e0a4b76ee6ce6
