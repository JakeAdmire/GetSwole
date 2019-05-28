import { hasErrorReducer } from '../hasErrorReducer';

describe('hasErrorReducer', () => {

  const mockState = '';
  const mockAction = {
    type: 'HAS_ERROR',
    message: 'Error Message'
  };

  it('should return state by default', () => {
    const results = hasErrorReducer(mockState, {});
    expect(results).toEqual(mockState);
  })

  it('should return action.message when the type is "HAS_ERROR"', () => {
    const results = hasErrorReducer(mockState, mockAction);
    expect(results).toEqual(mockAction.message); 
  })

})