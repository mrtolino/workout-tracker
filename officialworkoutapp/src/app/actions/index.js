 /*
  * Action type constants
  */
const CLEAR_EXERCISES = 'CLEAR_EXERCISES';
const RECEIVE_EXERCISES = 'RECEIVE_EXERCISES';
const REQUEST_EXERCISES = 'REQUEST_EXERCISES';
const REQUEST_SETS = 'REQUEST_SETS';
const RECEIVE_SETS = 'RECEIVE_SETS';
const UPDATE_SET_REQUEST = 'UPDATE_SET_REQUEST';
const UPDATE_SET_SUCCESS = 'UPDATE_SET_SUCCESS';
const ADD_SET_REQUEST = 'ADD_SET_REQUEST';
const ADD_SET_SUCCESS = 'ADD_SET_SUCCESS';
const DELETE_SET_REQUEST = 'DELETE_SET_REQUEST';
const DELETE_SET_SUCCESS = 'DELETE_SET_SUCCESS';
const ADD_EXERCISE_REQUEST = 'ADD_EXERCISE_REQUEST';
const ADD_EXERCISE_SUCCESS = 'ADD_EXERCISE_SUCCESS';
const DELETE_EXERCISE_REQUEST = 'DELETE_EXERCISE_REQUEST';
const DELETE_EXERCISE_SUCCESS = 'DELETE_EXERCISE_SUCCESS';
const DELETE_WORKOUT_REQUEST = 'DELETE_WORKOUT_REQUEST';
const DELETE_WORKOUT_SUCCESS = 'DELETE_WORKOUT_SUCCESS';
const FETCH_WORKOUTS_REQUEST = 'FETCH_WORKOUTS_REQUEST';
const FETCH_WORKOUTS_SUCCESS = 'FETCH_WORKOUTS_SUCCESS';
const ADD_WORKOUT_REQUEST = 'ADD_WORKOUT_REQUEST';
const ADD_WORKOUT_SUCCESS = 'ADD_WORKOUT_SUCCESS';

/*
 * Action creators
 */

export const clearExercises = () => {
    return {
      type: CLEAR_EXERCISES
    }
};

const requestExercises = () => {
    return {
      type: REQUEST_EXERCISES
    }
}

const receiveExercises = (json, workoutId) => {
  return {
    type: RECEIVE_EXERCISES,
    workoutId: workoutId,
    exercises: json.map(child => {
      return {
        id: child.id,
        name: child.name,
        exerciseSets: []
      }
    })
  }
}

const requestSets = () => {
  return {
    type: REQUEST_SETS
  }
}

const receiveSets = (json, exerciseId) => {
  return {
    type: RECEIVE_SETS,
    exerciseId: exerciseId,
    sets: json.map(child => {
      return {
        id: child.id,
        weight: child.weight,
        repetitions: child.repetitions
      }
    })
  }
}

const updateSetRequest = () => {
  return {
    type: UPDATE_SET_REQUEST
  }
}

const updateSetSuccess = (json, exerciseId) => {
  return {
    type: UPDATE_SET_SUCCESS,
    exerciseId: exerciseId,
    set: {
      id: json.id,
      weight: json.weight,
      repetitions: json.repetitions
    }
  }
}

const addSetRequest = () => {
  return {
    type: ADD_SET_REQUEST
  }
}

const addSetSuccess = (json, exerciseId) => {
  return {
    type: ADD_SET_SUCCESS,
    exerciseId: exerciseId,
    set: {
      id: json.id,
      weight: json.weight,
      repetitions: json.repetitions
    }
  }
}

const deleteSetRequest = () => {
  return {
    type: DELETE_SET_REQUEST
  }
}

const deleteSetSuccess = (json, exerciseId, setArrayIndex) => {
  return {
    type: DELETE_SET_SUCCESS,
    exerciseId: exerciseId,
    setArrayIndex: setArrayIndex
  }
}

const addExerciseRequest = (name, id) => {
  return {
    type: ADD_EXERCISE_REQUEST,
    id: id,
    name: name,
  }
}

const addExerciseSuccess = (json, workoutId) => {
  return {
    type: ADD_EXERCISE_SUCCESS,
    workoutId: workoutId,
    exercise: {
      id: json.id,
      name: json.name,
      exerciseSets: []
    }
  }
}

const deleteExerciseRequest = () => {
  return {
    type: DELETE_EXERCISE_REQUEST
  }
}

const deleteExerciseSuccess = (json, exerciseId, exrcIndex) => {
  return {
    type: DELETE_EXERCISE_SUCCESS,
    exerciseId: exerciseId,
    exrcIndex: exrcIndex
  }
}

const deleteWorkoutRequest = () => {
  return {
    type: DELETE_WORKOUT_REQUEST
  }
}

const deleteWorkoutSuccess = (json, workoutId, workoutIndex) => {
  return {
    type: DELETE_WORKOUT_SUCCESS,
    workoutId: workoutId,
    workoutIndex: workoutIndex
  }
}

const fetchWorkoutsRequest = () => {
  return {
    type: FETCH_WORKOUTS_REQUEST
  }
}

const fetchWorkoutsSuccess = (json) => {
  return {
    type: FETCH_WORKOUTS_SUCCESS,
    workouts: json.map((workout) => {
      return {
        id: workout.id,
        date: workout.createdAt,
        exercises: []
      }
    })
  }
}

const addWorkoutRequest = () => {
    return {
      type: ADD_WORKOUT_REQUEST
    }
}

const addWorkoutSuccess = (json) => {
  return {
    type: ADD_WORKOUT_SUCCESS,
    workout: {
      id: json.id,
      exercises: []
    }
  }
}

/*
 * Async action creators
 */

export const updateSet = (exerciseId, setId, weight, repetitions) => {
  return (dispatch) => {
    dispatch(updateSetRequest())
    return fetch('/api/updateset',
      {
        method: 'POST',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify({
          type: 'UPDATE_SET',
          exerciseId: exerciseId,
          setId: setId,
          weight: weight,
          repetitions: repetitions
        })
      }
    )
    .then(response => response.json())
    .then(json => dispatch(updateSetSuccess(json, exerciseId)))
  }
}

export const fetchSets = (exerciseId) => {
  return (dispatch) => {
    dispatch(requestSets())
    return fetch('/api/sets',
      {
        method: 'POST',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify({
          type: 'RETRIEVE_SETS',
          exerciseId: exerciseId
        })
      }
    )
    .then(response => response.json())
    .then(json => dispatch(receiveSets(json, exerciseId)))
  }
}

export const fetchExercises = (workoutId) => {
  return (dispatch) => {
    dispatch(requestExercises())
    return fetch('/api/exercises',
        {
          method: 'POST',
          headers: new Headers({'content-type': 'application/json'}),
          body: JSON.stringify({
            type: 'RETRIEVE_EXERCISES',
            workoutId: workoutId
          })
        }
      )
      .then(response => response.json())
      .then(json => dispatch(receiveExercises(json, workoutId)))
  }
}

export const addExercise = (workoutId, name) => {
  return (dispatch) => {
    dispatch(addExerciseRequest(name))
    return fetch('/api/addexercise',
        {
          method: 'POST',
          headers: new Headers({'content-type': 'application/json'}),
          body: JSON.stringify({
            type: 'ADD_EXERCISE',
            workoutId: workoutId,
            name: name
          })
        }
      )
      .then(response => response.json())
      .then(json => dispatch(addExerciseSuccess(json, workoutId)))
  }
}

export const addSet = (exerciseId, weight, repetitions) => {
  return (dispatch) => {
    dispatch(addSetRequest())
    return fetch('/api/addset',
      {
        method: 'POST',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify({
          type: 'ADD_SET',
          exerciseId: exerciseId,
          weight: weight,
          repetitions: repetitions
        })
      }
    )
    .then(response => response.json())
    .then(json => dispatch(addSetSuccess(json, exerciseId)))
  }
}

export const deleteSet = (exerciseId, setId, setArrayIndex) => {
  return (dispatch) => {
    dispatch(deleteSetRequest())
    return fetch('/api/deleteset',
      {
        method: 'POST',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify({
          type: 'DELETE_SET',
          exerciseId: exerciseId,
          setId: setId
        })
      }
    )
    .then(response => response.json())
    .then(json => dispatch(deleteSetSuccess(json, exerciseId, setArrayIndex)))
  }
}

export const deleteExercise = (exerciseId, exrcIndex) => {
  return (dispatch) => {
    dispatch(deleteExerciseRequest())
    return fetch('/api/deleteexercise',
      {
        method: 'POST',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify({
          type: 'DELETE_EXERCISE',
          exerciseId: exerciseId
        })
      }
    )
    .then(response => response.json())
    .then(json => dispatch(deleteExerciseSuccess(json, exerciseId, exrcIndex)))
  }
}

export const deleteWorkout = (workoutId, workoutIndex) => {
  return (dispatch) => {
    dispatch(deleteWorkoutRequest())
    return fetch('/api/deleteworkout',
      {
        method: 'POST',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify({
          type: 'DELETE_WORKOUT',
          workoutId: workoutId
        })
      }
    )
    .then(response => response.json())
    .then(json => dispatch(deleteWorkoutSuccess(json, workoutId, workoutIndex)))
  }
}

export const fetchWorkouts = () => {
  return (dispatch) => {
    dispatch(fetchWorkoutsRequest())
    return fetch('/api/workouts')
    .then(response => response.json())
    .then(json => dispatch(fetchWorkoutsSuccess(json)))
  }
}

export const addWorkout = () => {
  return (dispatch) => {
    dispatch(addWorkoutRequest())
    return fetch('/api/addworkout')
    .then(response => response.json())
    .then(json => dispatch(addWorkoutSuccess(json)))
  }
}
