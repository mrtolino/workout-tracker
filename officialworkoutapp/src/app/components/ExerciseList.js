import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
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
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-10'>
            <Link to={'/workoutlist'}>
              <button className='btn btn-primary no-gutters float-right'>Back to Workout List</button>
            </Link>
          </div>
        </div>
        <div className='row justify-content-center'>
          <div className='col-md-10'>
            <h4 className='exrc-name-label'>Exercise Name: </h4>
          </div>
        </div>
        <div className='row justify-content-center'>
          <div className='col-md-10'>
            <input className='form-control' placeholder='Enter a name' maxLength='30' ref={node => {
              this.exrcName = node;
            }} />
          </div>
        </div>
        <div className='row justify-content-center'>
          <div className='col-md-10'>
            <button className='btn btn-primary no-gutters' onClick={() => {
              this.props.onAddExercise(this.props.workoutId, this.exrcName.value)
              this.exrcName.value = '';
            }}>
              Add Exercise
            </button>
          </div>
        </div>

        <div className='row justify-content-center'>
          <div className='col-md-10'>
            <ul className='list-group no-gutters'>
              {this.props.exercises.map((exrc, index) => (
                <Exercise key={index} workoutId={this.props.workoutId} exrcIndex={index} exrc={exrc} />
              ))}
            </ul>
          </div>
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
