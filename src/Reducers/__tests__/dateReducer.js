import { dateReducer } from '../dateReducer';

describe('dateReducer', () => {

  const mockState = '';
  const mockAction = {
    type: 'SET_DATE',
    date: '12 05 1997'
  };

  it('should return state by default', () => {
    const results = dateReducer(mockState, {});
    expect(results).toEqual(mockState);
  })

  it('should return action.date when the type is "SET_DATE"', () => {
    const results = dateReducer(mockState, mockAction);
    expect(results).toEqual(mockAction.date);
  })

})