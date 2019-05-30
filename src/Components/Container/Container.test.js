import React from 'react';
import { shallow } from 'enzyme';
// 
import { Container, mapStateToProps } from './Container';

let wrapper;

let mockDate = '2019 5 25';
let semanticDateMock = '25th March, 2019';
let loadingMock = false;
let navToolMock = { navigate: jest.fn() };
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

let routinesMock2 = {
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
          }
        ]
      }
    },
    {
      id: "5",
      type: "routine",
      attributes: {
        name: "Leg Day",
        exercises: [
          {
            id: 75,
            name: "Squats",
            category: "Strength",
            equipment_required: "Body Only",
            muscle: "Legs",
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

describe('Container', () => {

  beforeEach(() => {
    wrapper = shallow(
      <Container  date={mockDate}
                  semanticDate={semanticDateMock}
                  loading={loadingMock}
                  navTool={navToolMock}
                  routines={routinesMock} />
    )
  })

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({ loading: true });
    expect(wrapper).toMatchSnapshot();
  })

  describe('handleAddNewRoutine()', () => {

    it.skip('should be invoked on button press', () => {
      let mockSpy = jest.spyOn(wrapper.instance(), 'handleAddNewRoutine');
      const addRoutineButton = wrapper
        .findWhere(node => node.prop('testID') === 'add-routine-button');

      addRoutineButton.props().onPress(); 

      expect(mockSpy).toHaveBeenCalled();
    })

    it('should invoke navTool.navigate with a string', () => {
      wrapper.instance().handleAddNewRoutine();
      expect(navToolMock.navigate).toHaveBeenCalledWith("routinePage");
    })

  })

  describe('displayCards()', () => {

    it('should match snapshot', () => {
      let mockSpy = jest.spyOn(wrapper.instance(), 'displayCards');
      expect(mockSpy).toMatchSnapshot();

      wrapper.setProps({ routines: routinesMock2 });
      expect(mockSpy).toMatchSnapshot();

      wrapper.setProps({ routines: {} });
      expect(mockSpy).toMatchSnapshot();
    })

    it('should call renderButton', () => {
      let mockSpy = jest.spyOn(wrapper.instance(), 'renderButton');

      wrapper.instance().displayCards();

      expect(mockSpy).toHaveBeenCalled();
    })

  })

  describe('renderButton()', () => {

    it('should match snapshot', () => {
      let mockSpy = jest.spyOn(wrapper.instance(), 'renderButton');

      expect(mockSpy).toMatchSnapshot();
    })

  })

})

describe('mapStateToProps', () => {

  it('should return a props object', () => {
    let mockState = {
      date: mockDate,
      semanticDate: semanticDateMock,
      routines: routinesMock,
      loading: loadingMock
    };
    let results = mapStateToProps(mockState);

    expect(results).toEqual(mockState)
  })

})
