import React from 'react';
import PropTypes from 'prop-types';
import Workout from './Workout';
import {connect} from 'react-redux';

import {addWorkout} from '../actions';

const WorkoutList = (props) => {
  return (
    <div className='container'>
      <h1>Workout Tracking Application</h1>
      <button onClick={props.onAddWorkout}>Add Workout</button>
      <ul>
        {
          props.workouts.map((workout, index) => (
            <Workout key={index} workout={workout} />
          ))
        }
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    workouts: state.workouts
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddWorkout: () => dispatch(addWorkout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutList);
