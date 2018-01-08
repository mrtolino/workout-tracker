import React from 'react';
import PropTypes from 'prop-types';
import ExerciseSet from './ExerciseSet';
import {connect} from 'react-redux';

import {deleteExercise, addSet, fetchSets} from '../actions';

class Exercise extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onFetchSets(this.props.exrc.id);
  }

  render() {
    return (
      <li className='list-group-item'>
        <div className='row'>
          <div className='col-10'>
            <h2 className='exrc-name float-left'>{`${this.props.exrc.name} `}</h2>
          </div>
          <div className='col-2'>
            {/* <button className='btn btn-secondary float-left'>Collapse</button> */}
            <button className='btn btn-danger float-right no-gutters' onClick={() => {
              this.props.onDeleteExercise(this.props.exrc.id, this.props.exrcIndex)
            }}>
              ×
            </button>
          </div>
        </div>

        <div className='row'>
          <div className='col'>
            <button className='btn btn-primary float-left no-gutters' onClick={() => {
              this.props.onAddSet(this.props.exrc.id, 0, 0)
            }}>
              Add Set
            </button>
          </div>
        </div>

        <div className='row'>
          <div className='col'>
            <ul className='list-group no-gutters'>
              {this.props.exrc.exerciseSets.sort((set1, set2) => {
                return set1.id > set2.id;
              })
              .map((set, index) => (
                <ExerciseSet key={set.id} index={index} workoutId={this.props.workoutId} exerciseId={this.props.exrc.id} setId={set.id}
                  weight={set.weight} repetitions={set.repetitions} />
              ))}
            </ul>
          </div>
        </div>
      </li>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteExercise: (exerciseId, exrcIndex) => {
      dispatch(deleteExercise(exerciseId, exrcIndex))
    },
    onAddSet: (exerciseId, weight, repetitions) => {
      dispatch(addSet(exerciseId, weight, repetitions))
    },
    onFetchSets: (exerciseId) => {
      dispatch(fetchSets(exerciseId))
    }
  };
};

/*Exercise.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};*/

export default connect(mapStateToProps, mapDispatchToProps)(Exercise);
