import React from 'react';
import PropTypes from 'prop-types';
import Workout from './Workout';
import {connect} from 'react-redux';

import {addWorkout, fetchWorkouts, deleteWorkout} from '../actions';

class WorkoutList extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onFetchWorkouts();
  }

  render() {
    return (
      <div className='row justify-content-center'>
        <div className='col-md-8'>
          <h1 className='title'>Workout Tracking Application</h1>
          <button className='btn btn-primary' onClick={this.props.onAddWorkout}>Add Workout</button>
          <ul className='list-group'>
            {
              this.props.workouts.map((workout, index) => (
                <Workout key={index} workout={workout} workoutIndex={index} onDeleteWorkout={this.props.onDeleteWorkout} />
              ))
            }
          </ul>
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
    onAddWorkout: () => dispatch(addWorkout()),
    onFetchWorkouts: () => dispatch(fetchWorkouts()),
    onDeleteWorkout: (workoutId, workoutIndex) => dispatch(deleteWorkout(workoutId, workoutIndex))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutList);
