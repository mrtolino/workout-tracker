import {combineReducers} from 'redux';
import {exercises, workouts} from './reducers';

const fitnessApp = combineReducers({
  workouts
});

export default fitnessApp;
