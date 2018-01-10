import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {updateSet, deleteSet} from '../actions';

class ExerciseSet extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      weight: props.weight,
      repetitions: props.repetitions,
      setSaved: true,
      setBeingDeleted: false
    };

    this.handleWeightChange = this.handleWeightChange.bind(this);
    this.handleRepetitionsChange = this.handleRepetitionsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.weight !== nextProps.weight || this.state.repetitions !== nextProps.repetitions) {
      this.setState({
        weight: nextProps.weight,
        repetitions: nextProps.repetitions
      })
    }
  }

  componentWillUnmount() {
    if (!this.state.setBeingDeleted && !this.state.setSaved)
      this.handleSubmit()
  }

  handleWeightChange(event) {
    this.setState({
      weight: event.target.value,
      setSaved: false
    });
  }

  handleRepetitionsChange(event) {
    this.setState({
      repetitions: event.target.value,
      setSaved: false
    });
  }

  handleSubmit(event) {
    this.props.onUpdateSet(this.props.exerciseId, this.props.index, this.props.setId, this.state.weight, this.state.repetitions);
    this.setState({
      setSaved: true
    });
  }

  handleDelete(event) {
    this.setState({
      setBeingDeleted: true
    });
    this.props.onDeleteSet(this.props.exerciseId, this.props.setId, this.props.index);
  }

  render() {
    return (
      <li className='list-group-item'>
        <div className='form-group has-success'>
          <h4 className='set-number'>{`Set ${this.props.index+1}`}</h4>
          <label className='set-data'>Weight:</label>
          <input className='form-control form-control-success' type='number' name='weight' value={this.state.weight} min='0'
            onChange={this.handleWeightChange} />
          <label className='set-data'>Repetitions:</label>
          <input className='form-control form-control-success' type='number' name='repetitions'
            value={this.state.repetitions} min='0' onChange={this.handleRepetitionsChange} />
          <div className='row'>
            <div className='col'>
              <button className='btn btn-success btn-block btn-margin-top no-gutters' type='button' onClick={this.handleSubmit}>Save</button>
            </div>
            <div className='col'>
              <button className='btn btn-danger btn-block btn-margin-top no-gutters' type='button' onClick={this.handleDelete}>Delete</button>
            </div>
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
    onUpdateSet: (exerciseId, setArrayIndex, setId, weight, repetitions) => {
      dispatch(updateSet(exerciseId, setArrayIndex, setId, weight, repetitions))
    }
    ,
    onDeleteSet: (exerciseId, setId, setArrayIndex) => {
      dispatch(deleteSet(exerciseId, setId, setArrayIndex))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseSet);
