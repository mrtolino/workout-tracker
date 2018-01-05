import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {onUpdateSet, onDeleteSet} from '../actions';

class ExerciseSet extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      weight: props.weight,
      repetitions: props.repetitions
    };

    this.handleWeightChange = this.handleWeightChange.bind(this);
    this.handleRepetitionsChange = this.handleRepetitionsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleWeightChange(event) {
    this.setState({weight: event.target.value});
  }

  handleRepetitionsChange(event) {
    this.setState({repetitions: event.target.value});
  }

  handleSubmit(event) {
    this.props.onUpdateSet(this.props.workoutId, this.props.exerciseId, this.props.setId, this.state.weight, this.state.repetitions);
  }

  handleDelete(event) {
    this.props.onDeleteSet(this.props.workoutId, this.props.exerciseId, this.props.setId, this.props.index);
  }

  render() {
    return (
      <li>
        <form onSubmit={this.handleSubmit}>
          <label> {`Set ${this.props.index+1} -- `} </label>
          <label>Weight: </label>
          <input type="number" value={this.state.weight} onChange={this.handleWeightChange} />
          <label> Repetitions: </label>
          <input type="number" value={this.state.repetitions} onChange={this.handleRepetitionsChange} />
          <input type="submit" value="Save" />
          <input type="button" value="Delete" onClick={this.handleDelete} />
        </form>
      </li>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateSet: (workoutId, exerciseId, setId, weight, repetitions) => {
      dispatch(updateSet(workoutId, exerciseId, setId, weight, repetitions))
    },
    onDeleteSet: (workoutId, exerciseId, setId, setArrayIndex) => {
      dispatch(deleteSet(workoutId, exerciseId, setId, setArrayIndex))
    }
  }
};

export default connect(mapDispatchToProps)(ExerciseSet);
