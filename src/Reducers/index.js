import { userReducer } from './userReducer';
import { dateReducer } from './dateReducer';
import { exercisesReducer } from './exercisesReducer';
import { routinesReducer } from './routinesReducer';
import { loadingReducer } from './loadingReducer';

import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  user: userReducer,
  date: dateReducer,
  exercises: exercisesReducer,
  routines: routinesReducer,
  loading: loadingReducer
});