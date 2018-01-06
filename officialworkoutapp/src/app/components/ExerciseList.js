import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Exercise from './Exercise';
import {addExercise, fetchExercises, clearExercises} from '../actions';

class ExerciseList extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onFetchExercises(this.props.workoutId);
  }

  componentWillUnmount() {
    this.props.onUnmount();
  }

  render() {
    return (
      <div className='row justify-content-center'>
        <div className='col-md-10'>
          <label>Exercise Name: </label>

          <input className='form-control input-xs' placeholder='Enter a name' ref={node => {
            this.exrcName = node;
          }} />

          <button className='btn btn-primary' onClick={() => {
            this.props.onAddExercise(this.props.workoutId, this.exrcName.value)
            this.exrcName.value = '';
          }}>
            Add Exercise
          </button>

          <ul className='list-group'>
            {this.props.exercises.map((exrc, index) => (
              <Exercise key={index} workoutId={this.props.workoutId} exrcIndex={index} exrc={exrc} />
            ))}
          </ul>
        </div>
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
    },
    onUnmount: () => {
      dispatch(clearExercises())
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseList);
