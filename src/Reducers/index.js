import { userReducer } from './userReducer';
import { dateReducer } from './dateReducer'
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  user: userReducer,
  date: dateReducer
});