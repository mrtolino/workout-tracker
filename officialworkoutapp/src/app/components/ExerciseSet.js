import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {updateSet, deleteSet} from '../actions';

class ExerciseSet extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      weight: props.weight || 0,
      repetitions: props.repetitions || 0
    };

    console.log(this.props);

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
    this.props.onUpdateSet(this.props.exerciseId, this.props.setId, this.state.weight, this.state.repetitions);
  }

  handleDelete(event) {
    this.props.onDeleteSet(this.props.exerciseId, this.props.setId, this.props.index);
  }

  render() {
    return (
      <li className='list-group-item'>
        <div className='form-group'>
          <h4 className='set-number'>{`Set ${this.props.index+1}`}</h4>
          <label>Weight:</label>
          <input className='form-control' type='number' name='weight' value={this.state.weight} onChange={this.handleWeightChange} />
          <label>Repetitions:</label>
          <input className='form-control' type='number' name='repetitions' value={this.state.repetitions} onChange={this.handleRepetitionsChange} />
          <div class='btn-center'><button className='btn btn-success float-left-custom' type='submit' onClick={this.handleSubmit}>Save</button></div>
          <div class='btn-center'><button className='btn btn-danger float-right-custom' type='button' onClick={this.handleDelete}>Delete</button></div>
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
    onUpdateSet: (exerciseId, setId, weight, repetitions) => {
      dispatch(updateSet(exerciseId, setId, weight, repetitions))
    },
    onDeleteSet: (exerciseId, setId, setArrayIndex) => {
      dispatch(deleteSet(exerciseId, setId, setArrayIndex))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseSet);
