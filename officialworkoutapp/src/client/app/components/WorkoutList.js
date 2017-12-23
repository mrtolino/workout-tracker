import React from 'react';
import PropTypes from 'prop-types';
import Workout from './Workout';
import {connect} from 'react-redux';

class WorkoutList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ul>
          {
            this.props.workouts.map((workout, index) => (
              <Workout key={workout.id} workoutIndex={index} workout={workout} />
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

WorkoutList = connect(
  mapStateToProps
)(WorkoutList);

export default WorkoutList;
