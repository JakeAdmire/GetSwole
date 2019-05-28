import { exercisesReducer } from '../exercisesReducer';

describe('exercisesReducer', () => {

  const mockState = '';
  const mockAction = {
    type: 'ADD_EXERCISES',
    exercises: []
  };

  it('should return state by default', () => {
    const results = exercisesReducer(mockState, {});
    expect(results).toEqual(mockState);
  })

  it('should return action.exercises when the type is "ADD_EXERCISES"', () => {
    const results = exercisesReducer(mockState, mockAction);
    expect(results).toEqual(mockAction.exercises);
  })

})