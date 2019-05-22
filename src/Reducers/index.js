import { userReducer } from './userReducer';
import { dateReducer } from './dateReducer';
import { exercisesReducer } from './exercisesReducer'
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  user: userReducer,
  date: dateReducer,
  exercises: exercisesReducer
});