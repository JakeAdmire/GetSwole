import * as creators from './index';

describe('addUser', () => {

  let mockType = 'ADD_USER';
  let mockUser = { id: 1, name: 'Bobby' };

  it('should return a type of "ADD_USER" and a user object', () => {
    const results = creators.addUser(mockUser);
    const expected = { 
      type: mockType, 
      user: mockUser 
    };
    expect(results).toEqual(expected);
  })

})

describe('setDate', () => {

  let mockType = 'SET_DATE';
  let mockDate = '12 03 1997';

  it('should return a type of "SET_DATE" and a date string', () => {
    const results = creators.setDate(mockDate);
    const expected = { 
      type: mockType, 
      date: mockDate 
    };
    expect(results).toEqual(expected);
  })

})

describe('setSemanticDate', () => {

  let mockType = 'SET_SEMANTIC_DATE';
  let mockDate = '15th Mar 1997';

  it('should return a type of "SET_SEMANTIC_DATE" and a date string', () => {
    const results = creators.setSemanticDate(mockDate);
    const expected = { 
      type: mockType, 
      date: mockDate 
    };
    expect(results).toEqual(expected);
  })

})

describe('addExercises', () => {

  let mockType = 'ADD_EXERCISES';
  let mockExercises = [];

  it('should return a type of "ADD_EXERCISES" and an exercises array', () => {
    const results = creators.addExercises(mockExercises);
    const expected = { 
      type: mockType, 
      exercises: mockExercises 
    };
    expect(results).toEqual(expected);
  })

})

describe('isLoading', () => {

  let mockType = 'IS_LOADING';
  let mockLoading = false;

  it('should return a type of "IS_LOADING" and a loading boolean', () => {
    const results = creators.isLoading(mockLoading);
    const expected = { 
      type: mockType, 
      isLoading: mockLoading 
    };
    expect(results).toEqual(expected);
  })

})

describe('hasError', () => {

  let mockType = 'HAS_ERROR';
  let mockMessage = 'Error Message';

  it('should return a type of "HAS_ERROR" and an error string', () => {
    const results = creators.hasError(mockMessage);
    const expected = { 
      type: mockType, 
      message: mockMessage 
    };
    expect(results).toEqual(expected);
  })

})

describe('setRoutines', () => {

  let mockType = 'SET_ROUTINES';
  let mockRoutines = 'Error Message';

  it('should return a type of "SET_ROUTINES" and a routines array', () => {
    const results = creators.setRoutines(mockRoutines);
    const expected = { 
      type: mockType, 
      routines: mockRoutines 
    };
    expect(results).toEqual(expected);
  })

})
