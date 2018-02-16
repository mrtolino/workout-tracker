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
const UPDATE_SET_FAILURE = 'UPDATE_SET_FAILURE';
const ADD_SET_REQUEST = 'ADD_SET_REQUEST';
const ADD_SET_SUCCESS = 'ADD_SET_SUCCESS';
const DELETE_SET_REQUEST = 'DELETE_SET_REQUEST';
const DELETE_SET_SUCCESS = 'DELETE_SET_SUCCESS';
const ADD_EXERCISE_REQUEST = 'ADD_EXERCISE_REQUEST';
const ADD_EXERCISE_SUCCESS = 'ADD_EXERCISE_SUCCESS';
const DELETE_EXERCISE_REQUEST = 'DELETE_EXERCISE_REQUEST';
const DELETE_EXERCISE_SUCCESS = 'DELETE_EXERCISE_SUCCESS';
const UPDATE_EXERCISE_NAME_REQUEST = 'UPDATE_EXERCISE_NAME_REQUEST';
const UPDATE_EXERCISE_NAME_SUCCESS = 'UPDATE_EXERCISE_NAME_SUCCESS';
const DELETE_WORKOUT_REQUEST = 'DELETE_WORKOUT_REQUEST';
const DELETE_WORKOUT_SUCCESS = 'DELETE_WORKOUT_SUCCESS';
const FETCH_WORKOUTS_REQUEST = 'FETCH_WORKOUTS_REQUEST';
const FETCH_WORKOUTS_SUCCESS = 'FETCH_WORKOUTS_SUCCESS';
const ADD_WORKOUT_REQUEST = 'ADD_WORKOUT_REQUEST';
const ADD_WORKOUT_SUCCESS = 'ADD_WORKOUT_SUCCESS';

/*
 * Action creators
 */

const requestSets = () => ({
  type: REQUEST_SETS,
});

const receiveSets = (json, exerciseId) => ({
  type: RECEIVE_SETS,
  exerciseId,
  sets: json.map(child => ({
    id: child.id,
    weight: child.weight,
    repetitions: child.repetitions,
    flag: 'set received',
  })),
});

const updateSetRequest = () => ({
  type: UPDATE_SET_REQUEST,
});

const updateSetSuccess = (set, exerciseId, setArrayIndex) => ({
  type: UPDATE_SET_SUCCESS,
  exerciseId,
  setArrayIndex,
  set: {
    id: set.id,
    weight: set.weight,
    repetitions: set.repetitions,
    flag: 'update successful',
  },
});

const updateSetFailure = (exerciseId, setArrayIndex) => ({
  type: UPDATE_SET_FAILURE,
  exerciseId,
  setArrayIndex,
  flag: 'update failed',
});

const addSetRequest = () => ({
  type: ADD_SET_REQUEST,
});

const addSetSuccess = (json, exerciseId) => ({
  type: ADD_SET_SUCCESS,
  exerciseId,
  set: {
    id: json.id,
    weight: json.weight,
    repetitions: json.repetitions,
  },
});

const deleteSetRequest = () => ({
  type: DELETE_SET_REQUEST,
});

const deleteSetSuccess = (json, exerciseId, setArrayIndex) => ({
  type: DELETE_SET_SUCCESS,
  exerciseId,
  setArrayIndex,
});

export const clearExercises = () => ({
  type: CLEAR_EXERCISES,
});

const requestExercises = () => ({
  type: REQUEST_EXERCISES,
});

const receiveExercises = (json, workoutId) => ({
  type: RECEIVE_EXERCISES,
  workoutId,
  exercises: json.map(child => ({
    id: child.id,
    name: child.name,
    exerciseSets: [],
  })),
});

const addExerciseRequest = (name, id) => ({
  type: ADD_EXERCISE_REQUEST,
  id,
  name,
});

const addExerciseSuccess = (json, workoutId) => ({
  type: ADD_EXERCISE_SUCCESS,
  workoutId,
  exercise: {
    id: json.id,
    name: json.name,
    exerciseSets: [],
  },
});

const deleteExerciseRequest = () => ({
  type: DELETE_EXERCISE_REQUEST,
});

const deleteExerciseSuccess = (json, exerciseId, exrcIndex) => ({
  type: DELETE_EXERCISE_SUCCESS,
  exerciseId,
  exrcIndex,
});

const updateExerciseNameRequest = () => ({
  type: UPDATE_EXERCISE_NAME_REQUEST,
});

const updateExerciseNameSuccess = (exerciseId, exrcIndex, name) => ({
  type: UPDATE_EXERCISE_NAME_SUCCESS,
  exerciseId,
  exrcIndex,
  name,
});

const deleteWorkoutRequest = () => ({
  type: DELETE_WORKOUT_REQUEST,
});

const deleteWorkoutSuccess = (json, workoutId, workoutIndex) => ({
  type: DELETE_WORKOUT_SUCCESS,
  workoutId,
  workoutIndex,
});

const fetchWorkoutsRequest = () => ({
  type: FETCH_WORKOUTS_REQUEST,
});

const fetchWorkoutsSuccess = json => ({
  type: FETCH_WORKOUTS_SUCCESS,
  workouts: json.map(workout => ({
    id: workout.id,
    date: workout.createdAt,
    name: workout.name,
    exercises: [],
  })),
});

const addWorkoutRequest = () => ({
  type: ADD_WORKOUT_REQUEST,
});

const addWorkoutSuccess = json => ({
  type: ADD_WORKOUT_SUCCESS,
  workout: {
    id: json.id,
    date: json.createdAt,
    name: json.name,
    exercises: [],
  },
});

/*
 * Async action creators
 */

export const fetchSets = (token, workoutId, exerciseId) => (dispatch) => {
  dispatch(requestSets());
  return fetch(
    '/api/sets',
    {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
        Authorization: `JWT ${token}`,
      }),
      body: JSON.stringify({
        type: 'RETRIEVE_SETS',
        workoutId,
        exerciseId,
      }),
    },
  )
    .then(response => response.json())
    .then(json => dispatch(receiveSets(json, exerciseId)));
};

export const addSet = (token, workoutId, exerciseId, weight, repetitions) => (dispatch) => {
  dispatch(addSetRequest());
  return fetch(
    '/api/addset',
    {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
        Authorization: `JWT ${token}`,
      }),
      body: JSON.stringify({
        type: 'ADD_SET',
        workoutId,
        exerciseId,
        weight,
        repetitions,
      }),
    },
  )
    .then(response => response.json())
    .then(json => dispatch(addSetSuccess(json, exerciseId)));
};

export const deleteSet = (token, workoutId, exerciseId, setId, setArrayIndex) => (dispatch) => {
  dispatch(deleteSetRequest());
  return fetch(
    '/api/deleteset',
    {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
        Authorization: `JWT ${token}`,
      }),
      body: JSON.stringify({
        type: 'DELETE_SET',
        workoutId,
        exerciseId,
        setId,
      }),
    },
  )
    .then(response => response.json())
    .then(json => dispatch(deleteSetSuccess(json, exerciseId, setArrayIndex)));
};

export const updateSet = (token, workoutId, exerciseId, setArrayIndex, setId, weight, repetitions) => (dispatch) => {
  dispatch(updateSetRequest());
  return fetch(
    '/api/updateset',
    {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
        Authorization: `JWT ${token}`,
      }),
      body: JSON.stringify({
        type: 'UPDATE_SET',
        workoutId,
        exerciseId,
        setId,
        weight,
        repetitions,
      }),
    },
  )
    .then(response => response.json())
    .then((json) => {
      if (json.message === 'success') {
        dispatch(updateSetSuccess({
          id: setId,
          weight,
          repetitions,
        }, exerciseId, setArrayIndex));
      } else {
        dispatch(updateSetFailure(exerciseId, setArrayIndex));
      }
    });
};

export const fetchExercises = (token, workoutId) => (dispatch) => {
  dispatch(requestExercises());
  return fetch(
    '/api/exercises',
    {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
        Authorization: `JWT ${token}`,
      }),
      body: JSON.stringify({
        type: 'RETRIEVE_EXERCISES',
        workoutId,
      }),
    },
  )
    .then(response => response.json())
    .then(json => dispatch(receiveExercises(json, workoutId)));
};

export const addExercise = (token, workoutId, name) => (dispatch) => {
  dispatch(addExerciseRequest(name));
  return fetch(
    '/api/addexercise',
    {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
        Authorization: `JWT ${token}`,
      }),
      body: JSON.stringify({
        type: 'ADD_EXERCISE',
        workoutId,
        name,
      }),
    },
  )
    .then(response => response.json())
    .then(json => dispatch(addExerciseSuccess(json, workoutId)));
};

export const deleteExercise = (token, workoutId, exerciseId, exrcIndex) => (dispatch) => {
  dispatch(deleteExerciseRequest());
  return fetch(
    '/api/deleteexercise',
    {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
        Authorization: `JWT ${token}`,
      }),
      body: JSON.stringify({
        type: 'DELETE_EXERCISE',
        workoutId,
        exerciseId,
      }),
    },
  )
    .then(response => response.json())
    .then(json => dispatch(deleteExerciseSuccess(json, exerciseId, exrcIndex)));
};

export const updateExerciseName = (token, workoutId, exerciseId, exrcIndex, name) => (dispatch) => {
  dispatch(updateExerciseNameRequest());
  return fetch(
    '/api/updateexercisename',
    {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
        Authorization: `JWT ${token}`,
      }),
      body: JSON.stringify({
        type: 'UPDATE_EXERCISE_NAME',
        workoutId,
        exerciseId,
        name,
      }),
    },
  )
    .then(response => response.json())
    .then(json => dispatch(updateExerciseNameSuccess(exerciseId, exrcIndex, name)));
};

export const fetchWorkouts = token => (dispatch) => {
  dispatch(fetchWorkoutsRequest());
  return fetch(
    '/api/workouts',
    {
      method: 'GET',
      headers: new Headers({ Authorization: `JWT ${token}` }),
    },
  )
    .then(response => response.json())
    .then(json => dispatch(fetchWorkoutsSuccess(json)));
};

export const addWorkout = (token, workoutName) => (dispatch) => {
  dispatch(addWorkoutRequest());
  return fetch(
    '/api/addworkout',
    {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
        Authorization: `JWT ${token}`,
      }),
      body: JSON.stringify({
        type: 'ADD_WORKOUT',
        workoutName,
      }),
    },
  )
    .then(response => response.json())
    .then(json => dispatch(addWorkoutSuccess(json)));
};

export const deleteWorkout = (token, workoutId, workoutIndex) => (dispatch) => {
  dispatch(deleteWorkoutRequest());
  return fetch(
    '/api/deleteworkout',
    {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
        Authorization: `JWT ${token}`,
      }),
      body: JSON.stringify({
        type: 'DELETE_WORKOUT',
        workoutId,
      }),
    },
  )
    .then(response => response.json())
    .then(json => dispatch(deleteWorkoutSuccess(json, workoutId, workoutIndex)));
};
