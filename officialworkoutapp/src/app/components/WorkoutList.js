import React from 'react';
import PropTypes from 'prop-types';
import Workout from './Workout';
import {connect} from 'react-redux';
import {withCookies, Cookies} from 'react-cookie';

import {addWorkout, fetchWorkouts, deleteWorkout} from '../actions';

class WorkoutList extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onFetchWorkouts(this.props.cookies.get('token'));
  }

  render() {
    return (
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <h1 className='title'>Workout Tracker</h1>
          </div>
        </div>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <button className='btn btn-primary no-gutters' onClick={() => this.props.onAddWorkout(this.props.cookies.get('token'))}>
              Add Workout
            </button>
          </div>
        </div>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <ul className='list-group no-gutters'>
              {
                this.props.workouts.map((workout, index) => (
                  <Workout key={index} workout={workout} workoutIndex={index} onDeleteWorkout={this.props.onDeleteWorkout} />
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    workouts: state.workouts
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddWorkout: (token) => dispatch(addWorkout(token)),
    onFetchWorkouts: (token) => dispatch(fetchWorkouts(token)),
    onDeleteWorkout: (workoutId, workoutIndex) => dispatch(deleteWorkout(workoutId, workoutIndex))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(WorkoutList));
