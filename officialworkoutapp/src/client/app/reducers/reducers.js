//sets reducer
export function sets (state = {}, action) {
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

      return state;

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
export function exercises (state = {}, action) {
  switch(action.type) {
    case 'ADD_EXERCISE_REQUEST':
      return state;

    case 'ADD_EXERCISE_SUCCESS':
      if (state.id !== action.workoutId)
        return state;

      return {
        ...state,
        exercises: [
          ...state.exercises,
          action.exercise
        ]
      };

    case 'ADD_SET_REQUEST':
      return state;

    case 'ADD_SET_SUCCESS':
      if (state.id !== action.workoutId)
        return state;

      return state.exercises.map(exrc => sets(exrc, action));

    case 'DELETE_EXERCISE_REQUEST':
      return state;

    case 'DELETE_EXERCISE_SUCCESS':
      if (state.id !== action.workoutId)
        return state;

      return {
        ...state,
        exercises: [
          ...state.exercises.slice(0, action.exrcIndex),
          ...state.exercises.slice(action.exrcIndex + 1)
        ]
      };

    case 'DELETE_SET_SUCCESS':
      if (state.id !== action.workoutId)
        return state;

      return state.exercises.map(exrc => sets(exrc, action));

    case 'RECEIVE_EXERCISES':
      if (state.id !== action.workoutId)
        return state;

      return {
        ...state,
        exercises: action.exercises
      };

    case 'REQUEST_EXERCISES':
      return state;

    case 'RECEIVE_SETS':
      if (state.id !== action.workoutId)
        return state;

      return state.exercises.map(exrc => sets(exrc, action));

    case 'REQUEST_SETS':
      return state;
    /*case 'UPDATE_SET_REQUEST':
      return state;*/
    /*case 'UPDATE_SET_SUCCESS':
      return state.map(exrc => sets(exrc, action));*/
    default:
      return state;
  }
};

export function workouts (state = [], action) {
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

    case 'ADD_EXERCISE_REQUEST':
      return state;
    case 'ADD_EXERCISE_SUCCESS':
      return state.map(workout => exercises(workout, action));
    case 'ADD_SET_REQUEST':
      return state;
    case 'ADD_SET_SUCCESS':
      return state.map(workout => exercises(workout, action));
    case 'DELETE_EXERCISE_REQUEST':
      return state;
    case 'DELETE_EXERCISE_SUCCESS':
      return state.map(workout => exercises(workout, action));
    case 'DELETE_SET_SUCCESS':
      return state.map(workout => exercises(workout, action));
    case 'RECEIVE_EXERCISES':
      return state.map(workout => exercises(workout, action));
    case 'REQUEST_EXERCISES':
      return state;
    case 'RECEIVE_SETS':
      return state.map(workout => exercises(workout, action));
    case 'REQUEST_SETS':
      return state;

    default:
      return state;
  }
};
