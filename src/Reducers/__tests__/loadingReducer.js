import { loadingReducer } from '../loadingReducer';

describe('loadingReducer', () => {

  const mockState = '';
  const mockAction = {
    type: 'IS_LOADING',
    isLoading: true
  };

  it('should return state by default', () => {
    const results = loadingReducer(mockState, {});
    expect(results).toEqual(mockState);
  })

  it('should return action.isLoading when the type is "IS_LOADING"', () => {
    const results = loadingReducer(mockState, mockAction);
    expect(results).toEqual(mockAction.isLoading); 
  })

})