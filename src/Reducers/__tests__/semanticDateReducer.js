import { semanticDateReducer } from '../semanticDateReducer';

describe('semanticDateReducer', () => {

  const mockState = '';
  const mockAction = {
    type: 'SET_SEMANTIC_DATE',
    date: '15th Mar 2019'
  };

  it('should return state by default', () => {
    const results = semanticDateReducer(mockState, {});
    expect(results).toEqual(mockState);
  })

  it('should return action.date when the type is "SET_SEMANTIC_DATE"', () => {
    const results = semanticDateReducer(mockState, mockAction);
    expect(results).toEqual(mockAction.date); 
  })

})