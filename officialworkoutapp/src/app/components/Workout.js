import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import { withRouter } from 'react-router';

import DeleteConfirmationModal from './DeleteConfirmationModal';

class Workout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderConfirmationModal: false,
    };

    this.onCloseConfirmationModal = this.onCloseConfirmationModal.bind(this);
    this.onConfirmDelete = this.onConfirmDelete.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  onCloseConfirmationModal() {
    this.setState({ renderConfirmationModal: false });
  }

  onConfirmDelete() {
    this.props.onDeleteWorkout(this.props.workout.id, this.props.workoutIndex);
    this.onCloseConfirmationModal();
  }

  renderWorkoutName() {
    if (this.props.workout.name) {
      return (
        <p>{this.props.workout.name}</p>
      );
    }
    return (
      <p>{`Workout ${this.props.workoutIndex} `}</p>
    );
  }

  handleClick(e) {
    if (e.target.id === 'deleteWorkoutBtn') {
      this.setState({
        renderConfirmationModal: true
      })
    } else if (!this.state.renderConfirmationModal) {
      this.props.history.push(`/exercises/${this.props.workout.id}`)
    }
  }

  render() {
    return (
      <li className="list-group-item clickable" onClick={this.handleClick}>
        <div className="float-left">
          {this.renderWorkoutName()}
          <p>{new Date(this.props.workout.createdAt).toLocaleDateString('en-US')}</p>
        </div>
        <div className="float-right">
          <button
            id="deleteWorkoutBtn"
            className="hollow button alert"
          >
            Delete
          </button>
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

Workout.propTypes = {
  key: PropTypes.number,
  workout: PropTypes.object.isRequired,
  workoutIndex: PropTypes.number.isRequired,
  onDeleteWorkout: PropTypes.func.isRequired,
  cookies: PropTypes.object.isRequired,
};

export default withRouter(withCookies(Workout));
