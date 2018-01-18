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

const updateSetSuccess = (set, exerciseId, setArrayIndex) => {
  return {
    type: UPDATE_SET_SUCCESS,
    exerciseId: exerciseId,
    setArrayIndex: setArrayIndex,
    set: {
      id: set.id,
      weight: set.weight,
      repetitions: set.repetitions
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
      date: json.createdAt,
      exercises: []
    }
  }
}

/*
 * Async action creators
 */

export const fetchSets = (token, workoutId, exerciseId) => {
  return (dispatch) => {
    dispatch(requestSets())
    return fetch('/api/sets',
      {
        method: 'POST',
        headers: new Headers(
          {'content-type': 'application/json',
           'Authorization': 'JWT ' + token}
        ),
        body: JSON.stringify({
          type: 'RETRIEVE_SETS',
          workoutId: workoutId,
          exerciseId: exerciseId
        })
      }
    )
    .then(response => response.json())
    .then(json => dispatch(receiveSets(json, exerciseId)))
  }
}

export const addSet = (token, workoutId, exerciseId, weight, repetitions) => {
  return (dispatch) => {
    dispatch(addSetRequest())
    return fetch('/api/addset',
      {
        method: 'POST',
        headers: new Headers(
          {'content-type': 'application/json',
           'Authorization': 'JWT ' + token}
        ),
        body: JSON.stringify({
          type: 'ADD_SET',
          workoutId: workoutId,
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

export const deleteSet = (token, workoutId, exerciseId, setId, setArrayIndex) => {
  return (dispatch) => {
    dispatch(deleteSetRequest())
    return fetch('/api/deleteset',
      {
        method: 'POST',
        headers: new Headers(
          {'content-type': 'application/json',
           'Authorization': 'JWT ' + token}
        ),
        body: JSON.stringify({
          type: 'DELETE_SET',
          workoutId: workoutId,
          exerciseId: exerciseId,
          setId: setId
        })
      }
    )
    .then(response => response.json())
    .then(json => dispatch(deleteSetSuccess(json, exerciseId, setArrayIndex)))
  }
}

export const updateSet = (token, workoutId, exerciseId, setArrayIndex, setId, weight, repetitions) => {
  return (dispatch) => {
    dispatch(updateSetRequest())
    return fetch('/api/updateset',
      {
        method: 'POST',
        headers: new Headers(
          {'content-type': 'application/json',
           'Authorization': 'JWT ' + token}
        ),
        body: JSON.stringify({
          type: 'UPDATE_SET',
          workoutId: workoutId,
          exerciseId: exerciseId,
          setId: setId,
          weight: weight,
          repetitions: repetitions
        })
      }
    )
    .then(response => response.json())
    .then(json => { //TODO: Check if JSON response is successful or not
      dispatch(updateSetSuccess({
        id: setId,
        weight: weight,
        repetitions: repetitions
      }, exerciseId, setArrayIndex))
    })
  }
}

export const fetchExercises = (token, workoutId) => {
  return (dispatch) => {
    dispatch(requestExercises())
    return fetch('/api/exercises',
        {
          method: 'POST',
          headers: new Headers(
            {'content-type': 'application/json',
             'Authorization': 'JWT ' + token}
          ),
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

export const addExercise = (token, workoutId, name) => {
  return (dispatch) => {
    dispatch(addExerciseRequest(name))
    return fetch('/api/addexercise',
        {
          method: 'POST',
          headers: new Headers(
            {'content-type': 'application/json',
             'Authorization': 'JWT ' + token}
          ),
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

export const deleteExercise = (token, workoutId, exerciseId, exrcIndex) => {
  return (dispatch) => {
    dispatch(deleteExerciseRequest())
    return fetch('/api/deleteexercise',
      {
        method: 'POST',
        headers: new Headers(
          {'content-type': 'application/json',
           'Authorization': 'JWT ' + token}
        ),
        body: JSON.stringify({
          type: 'DELETE_EXERCISE',
          workoutId: workoutId,
          exerciseId: exerciseId
        })
      }
    )
    .then(response => response.json())
    .then(json => dispatch(deleteExerciseSuccess(json, exerciseId, exrcIndex)))
  }
}

export const fetchWorkouts = (token) => {
  return (dispatch) => {
    dispatch(fetchWorkoutsRequest())
    return fetch('/api/workouts',
      {
        method: 'GET',
        headers: new Headers(
          {'Authorization': 'JWT ' + token}
        )
      }
    )
    .then(response => response.json())
    .then(json => dispatch(fetchWorkoutsSuccess(json)))
  }
}

export const addWorkout = (token) => {
  return (dispatch) => {
    dispatch(addWorkoutRequest())
    return fetch('/api/addworkout',
      {
        method: 'GET',
        headers: new Headers(
          {'Authorization': 'JWT ' + token}
        )
      }
    )
    .then(response => response.json())
    .then(json => dispatch(addWorkoutSuccess(json)))
  }
}

export const deleteWorkout = (token, workoutId, workoutIndex) => {
  return (dispatch) => {
    dispatch(deleteWorkoutRequest())
    return fetch('/api/deleteworkout',
      {
        method: 'POST',
        headers: new Headers(
          {'content-type': 'application/json',
          'Authorization': 'JWT ' + token}
        ),
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
