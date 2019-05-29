import React from 'react'
import { shallow } from 'enzyme'
import { RoutineContainer, mapStateToProps } from './RoutineContainer'

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
  let mockState = {
    user: mockUser.name,
    date: mockDate,
    semanticDate: semanticDateMock,
    routines: routinesMock,
    loading: loadingMock,
    newRoutine: routinesMock.data[0],
    hasError: false  };

describe('RoutineContainer', () => {
  it('should match the snapshot', () => {
    let wrapper = shallow(<RoutineContainer />)
    expect(wrapper).toMatchSnapshot()
  })

  describe('mapStateToProps', () => {
    it('should mapStateToProps', () => {
      const expected = {
        date: mockDate,
        newRoutine: routinesMock.data[0],
        user: mockUser.name
      }
      const results = mapStateToProps(mockState)
      expect(results).toEqual(expected)
    })
  })

  
})