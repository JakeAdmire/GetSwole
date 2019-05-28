import { routinesReducer } from '../routinesReducer';

describe('routinesReducer', () => {

  const mockState = '';
  const mockAction = {
    type: 'SET_ROUTINES',
    routines: []
  };

  it('should return state by default', () => {
    const results = routinesReducer(mockState, {});
    expect(results).toEqual(mockState);
  })

  it('should return action.routines when the type is "SET_ROUTINES"', () => {
    const results = routinesReducer(mockState, mockAction);
    expect(results).toEqual(mockAction.routines); 
  })

})