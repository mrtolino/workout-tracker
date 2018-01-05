import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Exercise from './Exercise';
import {addExercise, fetchExercises} from '../actions';

class ExerciseList extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("COMPONENT DID MOUNT", this.props.workoutId);
    this.props.onFetchExercises(this.props.workoutId);
    /*this.props.exercises.forEach((exrc) => {
      store.dispatch(fetchSets(exrc.id))
    });*/
  }

  render() {
    return (
      <div>
        <label>Exercise Name: </label>

        <input placeholder="Enter a name" ref={node => {
          this.exrcName = node;
        }} />

        <button onClick={() => {
          this.props.onAddExercise(this.props.workoutId, this.exrcName.value)
          this.exrcName.value = '';
        }}>
          +
        </button>

        <ul>
          {this.props.exercises.map((exrc, index) => (
            <Exercise key={index} workoutId={this.props.workoutId} exrcIndex={index} exrc={exrc} />
          ))}
        </ul>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    exercises: state.exercises
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddExercise: (workoutId, name) => {
      dispatch(addExercise(workoutId, name))
    },
    onFetchExercises: (workoutId) => {
      dispatch(fetchExercises(workoutId))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseList);
