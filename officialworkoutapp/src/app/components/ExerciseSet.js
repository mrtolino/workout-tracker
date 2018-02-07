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
      weight: props.set.weight,
      repetitions: props.set.repetitions,
      setSaved: true,
      setBeingDeleted: false,
      renderConfirmationModal: false,
      updateFailed: false,
      updateSuccessful: false
    };

    this.handleWeightChange = this.handleWeightChange.bind(this);
    this.handleRepetitionsChange = this.handleRepetitionsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onCloseConfirmationModal = this.onCloseConfirmationModal.bind(this);
    this.onConfirmDelete = this.onConfirmDelete.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // if (this.state.weight !== nextProps.set.weight || this.state.repetitions !== nextProps.set.repetitions) {
    //   this.setState({
    //     weight: nextProps.set.weight,
    //     repetitions: nextProps.set.repetitions
    //   });
    // }

    if (nextProps.set.flag === 'update failed' && !this.state.updatedFailed) {
      this.setState({
        updateFailed: true
      });
    } else if (nextProps.set.flag === 'update successful' && !this.state.updateSuccessful) {
      this.setState({
        updateSuccessful: true
      });
    }
  }

  componentWillUnmount() {
    if (!this.state.setBeingDeleted && !this.state.setSaved) {
      this.handleSubmit()
    }
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
    this.props.onUpdateSet(this.props.workoutId, this.props.exerciseId, this.props.set.id,
      this.props.index, this.state.weight, this.state.repetitions);
    this.setState({
      setSaved: true
    });
  }

  onConfirmDelete() {
    this.setState({
      setBeingDeleted: true
    });
    this.props.onDeleteSet(this.props.workoutId, this.props.exerciseId, this.props.set.id, this.props.index);
    this.onCloseConfirmationModal();
  }

  onCloseConfirmationModal() {
    this.setState({renderConfirmationModal: false});
  }

  renderUpdateSetFailedAlert() {
    if (this.state.updateFailed) {
      setTimeout(() => {
        this.setState({
          updateFailed: false
        })
      }, 3000);
      return (
        <div className='alert alert-danger' role='alert'>
          <strong>Oops!</strong> Please double check your input.
        </div>
      );
    }
  }

  renderUpdateSetSuccessAlert() {
    if (this.state.updateSuccessful) {
      setTimeout(() => {
        this.setState({
          updateSuccessful: false
        })
      }, 3000);
      return (
        <div className='alert alert-success' role='alert'>
          <strong>Success!</strong> Set saved.
        </div>
      );
    }
  }

  render() {
    return (
      <li className='list-group-item'>
        <div className='form-group'>
          {this.renderUpdateSetFailedAlert()}
          {this.renderUpdateSetSuccessAlert()}
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

// const mapStateToProps = (state) => {
//   return {};
// };
//
// const mapDispatchToProps = (dispatch) => {
//   return {
//     onUpdateSet: (token, workoutId, exerciseId, setArrayIndex, setId, weight, repetitions) => {
//       dispatch(updateSet(token, workoutId, exerciseId, setArrayIndex, setId, weight, repetitions))
//     }
//     ,
//     onDeleteSet: (token, workoutId, exerciseId, setId, setArrayIndex) => {
//       dispatch(deleteSet(token, workoutId, exerciseId, setId, setArrayIndex))
//     }
//   }
// };

ExerciseSet.propTypes = {
  key: PropTypes.number,
  index: PropTypes.number.isRequired,
  workoutId: PropTypes.number.isRequired,
  exerciseId: PropTypes.number.isRequired,
  set: PropTypes.object.isRequired,
  onUpdateSet: PropTypes.func.isRequired,
  onDeleteSet: PropTypes.func.isRequired,
  cookies: PropTypes.object.isRequired
};

export default withCookies(ExerciseSet);
