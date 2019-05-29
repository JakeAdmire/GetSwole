import { userReducer } from './userReducer';
import { dateReducer } from './dateReducer';
import { semanticDateReducer } from './semanticDateReducer';
import { exercisesReducer } from './exercisesReducer';
import { routinesReducer } from './routinesReducer';
import { loadingReducer } from './loadingReducer';
import { newRoutineReducer } from './newRoutineReducer'
import { hasErrorReducer } from './hasErrorReducer'
import { selectedRoutineReducer } from './selectedRoutineReducer';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  user: userReducer,
  date: dateReducer,
  semanticDate: semanticDateReducer,
  exercises: exercisesReducer,
  routines: routinesReducer,
  loading: loadingReducer,
  newRoutine: newRoutineReducer,
  hasError: hasErrorReducer,
  selectedRoutine: selectedRoutineReducer
});