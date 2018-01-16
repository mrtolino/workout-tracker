import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withCookies} from 'react-cookie';

import {updateSet, deleteSet} from '../actions';
import DeleteConfirmationModal from './DeleteConfirmationModal';

class ExerciseSet extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      weight: props.weight,
      repetitions: props.repetitions,
      setSaved: true,
      setBeingDeleted: false,
      renderConfirmationModal: false
    };

    this.handleWeightChange = this.handleWeightChange.bind(this);
    this.handleRepetitionsChange = this.handleRepetitionsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onCloseConfirmationModal = this.onCloseConfirmationModal.bind(this);
    this.onConfirmDelete = this.onConfirmDelete.bind(this);
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

  handleSubmit() {
    this.props.onUpdateSet(this.props.cookies.get('token'), this.props.workoutId, this.props.exerciseId, this.props.index,
                           this.props.setId, this.state.weight, this.state.repetitions);
    this.setState({
      setSaved: true
    });
  }

  onConfirmDelete() {
    this.setState({
      setBeingDeleted: true
    });
    this.props.onDeleteSet(this.props.cookies.get('token'), this.props.workoutId,
                           this.props.exerciseId, this.props.setId, this.props.index);
    this.onCloseConfirmationModal();
  }

  onCloseConfirmationModal() {
    this.setState({renderConfirmationModal: false});
  }

  render() {
    return (
      <li className='list-group-item'>
        <div className='form-group'>
          <h4 className='set-number'>{`Set ${this.props.index+1}`}</h4>
          <label className='set-data'>Weight:</label>
          <input className='form-control' type='number' name='weight' value={this.state.weight} min='0'
            onChange={this.handleWeightChange} />
          <label className='set-data'>Repetitions:</label>
          <input className='form-control' type='number' name='repetitions'
            value={this.state.repetitions} min='0' onChange={this.handleRepetitionsChange} />
          <div className='row'>
            <div className='col'>
              <button className='btn btn-success btn-block btn-margin-top no-gutters' type='button' onClick={this.handleSubmit}>Save</button>
            </div>
            <div className='col'>
              <button className='btn btn-danger btn-block btn-margin-top no-gutters' type='button'
                onClick={() => this.setState({renderConfirmationModal: true})}>
                Delete
              </button>
            </div>
          </div>
        </div>

        <DeleteConfirmationModal
          renderConfirmationModal={this.state.renderConfirmationModal}
          onCloseConfirmationModal={this.onCloseConfirmationModal}
          onConfirmDelete={this.onConfirmDelete}
        />

      </li>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateSet: (token, workoutId, exerciseId, setArrayIndex, setId, weight, repetitions) => {
      dispatch(updateSet(token, workoutId, exerciseId, setArrayIndex, setId, weight, repetitions))
    }
    ,
    onDeleteSet: (token, workoutId, exerciseId, setId, setArrayIndex) => {
      dispatch(deleteSet(token, workoutId, exerciseId, setId, setArrayIndex))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(ExerciseSet));
