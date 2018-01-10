import {combineReducers} from 'redux';

//sets reducer
function sets (state = {}, action) {
  switch(action.type) {
    case 'RECEIVE_SETS':
      if (state.id !== action.exerciseId)
        return state;

      return {
        ...state,
        exerciseSets: action.sets
      }

    case 'ADD_SET_SUCCESS':
      if (state.id !== action.exerciseId)
        return state;

      return {
        ...state,
        exerciseSets: [
          ...state.exerciseSets,
          action.set
        ]
      }

    case 'UPDATE_SET_SUCCESS':
      if (state.id !== action.exerciseId)
        return state;

      console.log(action.set);

      return {
        ...state,
        exerciseSets: [
          ...state.exerciseSets.slice(0, action.setArrayIndex),
          action.set,
          ...state.exerciseSets.slice(action.setArrayIndex + 1)
        ]
      }

    case 'DELETE_SET_SUCCESS':
      if (state.id !== action.exerciseId)
        return state;

      return {
        ...state,
        exerciseSets: [
          ...state.exerciseSets.slice(0, action.setArrayIndex),
          ...state.exerciseSets.slice(action.setArrayIndex + 1)
        ]
      }

    default:
      return state;
  }
};

//exercises reducer
function exercises (state = [], action) {
  switch(action.type) {
    case 'ADD_EXERCISE_REQUEST':
      return state;

    case 'ADD_EXERCISE_SUCCESS':
      return [
        ...state,
        action.exercise
      ];

    case 'ADD_SET_REQUEST':
      return state;

    case 'ADD_SET_SUCCESS':
      return state.map(exrc => sets(exrc, action));

    case 'CLEAR_EXERCISES':
      return [];

    case 'DELETE_EXERCISE_REQUEST':
      return state;

    case 'DELETE_EXERCISE_SUCCESS':
      return [
        ...state.slice(0, action.exrcIndex),
        ...state.slice(action.exrcIndex + 1)
      ];

    case 'DELETE_SET_REQUEST':
      return state;
    case 'DELETE_SET_SUCCESS':
      return state.map(exrc => sets(exrc, action));

    case 'RECEIVE_EXERCISES':
      return action.exercises;

    case 'REQUEST_EXERCISES':
      return state;

    case 'RECEIVE_SETS':
      return state.map(exrc => sets(exrc, action));

    case 'REQUEST_SETS':
      return state;
    case 'UPDATE_SET_REQUEST':
      return state;
    case 'UPDATE_SET_SUCCESS':
      return state.map(exrc => sets(exrc, action));
    default:
      return state;
  }
};

function workouts (state = [], action) {
  switch(action.type) {
    case 'ADD_WORKOUT_REQUEST':
      return state;
    case 'ADD_WORKOUT_SUCCESS':
      return [
        ...state,
        action.workout
      ];
    case 'FETCH_WORKOUTS_REQUEST':
      return state;
    case 'FETCH_WORKOUTS_SUCCESS':
      return action.workouts;
    case 'DELETE_WORKOUT_REQUEST':
      return state;
    case 'DELETE_WORKOUT_SUCCESS':
      return [
        ...state.slice(0, action.workoutIndex),
        ...state.slice(action.workoutIndex + 1)
      ];
    default:
      return state;
  }
};

const FitnessApp = combineReducers({
  workouts,
  exercises
});

export default FitnessApp;
