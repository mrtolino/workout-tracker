import React from 'react';
import PropTypes from 'prop-types';
import Exercise from './Exercise';
import {addExercise, addSet, updateSet, deleteSet, deleteExercise, fetchExercises, fetchSets} from '../actions';
import {connect} from 'react-redux';

class ExerciseList extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.onFetchExercises(this.props.match.params.workoutid);
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
          this.props.onAddExercise(this.props.match.params.workoutid, this.exrcName.value)
          this.exrcName.value = '';
        }}>
          +
        </button>

        <ul>
          {this.props.exercises.map((exrc, index) => (
            <Exercise key={exrc.id} workoutId={this.props.match.params.workoutid} exrcIndex={index} exrc={exrc} onFetchSets={this.props.onFetchSets}
              onDeleteExercise={this.props.onDeleteExercise} onAddSet={this.props.onAddSet} onUpdateSet={this.props.onUpdateSet}
              onDeleteSet={this.props.onDeleteSet} />
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
    onDeleteExercise: (workoutId, exerciseId, exrcIndex) => {
      dispatch(deleteExercise(workoutId, exerciseId, exrcIndex))
    },
    onAddSet: (workoutId, exerciseId, weight, repetitions) => {
      dispatch(addSet(workoutId, exerciseId, weight, repetitions))
    },
    onUpdateSet: (workoutId, exerciseId, setId, weight, repetitions) => {
      dispatch(updateSet(workoutId, exerciseId, setId, weight, repetitions))
    },
    onDeleteSet: (workoutId, exerciseId, setId, setArrayIndex) => {
      dispatch(deleteSet(workoutId, exerciseId, setId, setArrayIndex))
    },
    onFetchExercises: (workoutId) => {
      dispatch(fetchExercises(workoutId))
    },
    onFetchSets: (workoutId, exerciseId) => {
      dispatch(fetchSets(workoutId, exerciseId))
    }
  }
};

ExerciseList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExerciseList);

export default ExerciseList;
