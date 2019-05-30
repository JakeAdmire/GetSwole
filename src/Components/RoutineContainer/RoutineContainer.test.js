import React from 'react'
import { shallow } from 'enzyme'
import { RoutineContainer, mapStateToProps, mapDispatchToProps } from './RoutineContainer'
import { setPreMadeRoutine } from '../../Thunks/setPreMadeRoutine'

let mockDate = '2019 5 25';
let mockUser = { name: 'John', id: 1 };
let mockNavigation = { navigate: jest.fn() };
let mockFetchRoutines = jest.fn();
let mockAddPremadeRoutine = jest.fn();
let mockNewRoutine = {
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
};

let wrapper;
beforeEach(() => {
  wrapper = shallow(
    <RoutineContainer addPremadeRoutine={mockAddPremadeRoutine}
                      fetchRoutines={mockFetchRoutines}
                      navigation={mockNavigation}
                      date={mockDate}
                      user={mockUser}
                      newRoutine={mockNewRoutine} />
  )
})

describe('RoutineContainer', () => {
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  describe.skip('componentDidMount', () => {
    it('should call this.handleRoutines()', () => {
      const instance = wrapper.instance()
      instance.componentDidMount()
      const mockHandleSetRoutines = jest.fn()
      expect(mockHandleSetRoutines).toHaveBeenCalled()
    })
  })

  describe('handleCreateRoutine', () => {
    it('should call setState to set showSelector to false', () => {
      const instance = wrapper.instance()
      expect(wrapper.state('showSelector')).toBe(true)
      instance.handleCreateRoutine()
      expect(wrapper.state('showSelector')).toBe(false)
    })
  })

  describe('mapStateToProps', () => {
    it('should mapStateToProps', () => {
      const expected = {
        date: mockDate,
        newRoutine: mockNewRoutine,
        user: mockUser.name
      }
      const results = mapStateToProps(expected)
      expect(results).toEqual(expected)
    })
  })

  describe.skip('mapDispatchToProps', () => {
    it('should dispatch setPremadeRoutine(THUNK) when this.addPremadeRoutine is called', () => {
      const mockDispatch = jest.fn()
      const actionToDispatch = setPreMadeRoutine(routinesMock.data, mockDate, mockUser)
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.setPreMadeRoutine(routinesMock.data, mockDate, mockUser)
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })
})