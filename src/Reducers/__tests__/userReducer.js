import { userReducer } from '../userReducer';

describe('userReducer', () => {

  const mockState = '';
  const mockAction = {
    type: 'ADD_USER',
    user: '15th Mar 2019'
  };

  it('should return state by default', () => {
    const results = userReducer(mockState, {});
    expect(results).toEqual(mockState);
  })

  it('should return action.user when the type is "ADD_USER"', () => {
    const results = userReducer(mockState, mockAction);
    expect(results).toEqual(mockAction.user); 
  })

})