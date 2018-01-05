import React from 'react';
import PropTypes from 'prop-types';
import Workout from './Workout';
import {connect} from 'react-redux';

import {addWorkout, fetchWorkouts} from '../actions';

class WorkoutList extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onFetchWorkouts();
  }

  render() {
    return (
      <div className='container'>
        <h1>Workout Tracking Application</h1>
        <button onClick={this.props.onAddWorkout}>Add Workout</button>
        <ul>
          {
            this.props.workouts.map((workout, index) => (
              <Workout key={index} workout={workout} />
            ))
          }
        </ul>
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
    onFetchWorkouts: () => dispatch(fetchWorkouts())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutList);
