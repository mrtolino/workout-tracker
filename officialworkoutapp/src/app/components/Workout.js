import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {withCookies} from 'react-cookie';

import DeleteConfirmationModal from './DeleteConfirmationModal';

class Workout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      renderConfirmationModal: false
    };

    this.onCloseConfirmationModal = this.onCloseConfirmationModal.bind(this);
    this.onConfirmDelete = this.onConfirmDelete.bind(this);
  }

  onCloseConfirmationModal() {
    this.setState({renderConfirmationModal: false});
  }

  onConfirmDelete() {
    this.props.onDeleteWorkout(this.props.cookies.get('token'), this.props.workout.id, this.props.workoutIndex)
    this.onCloseConfirmationModal();
  }

  renderWorkoutName() {
    if (this.props.workout.name) {
      return (
        <p>{this.props.workout.name}</p>
      );
    } else {
      return (
        <p>{`Workout ${this.props.workoutIndex} `}</p>
      );
    }
  }

  render() {
    return (
      <li className='list-group-item'>
        <div className='float-left'>
          <Link to={`/exercises/${this.props.workout.id}`}>
            {this.renderWorkoutName()}
          </Link>
          <p>{new Date(this.props.workout.date).toLocaleDateString('en-US')}</p>
        </div>
        <div className='float-right'>
          <button className='btn btn-danger'
            onClick={() => this.setState({renderConfirmationModal: true})}>
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
  cookies: PropTypes.object.isRequired
};

export default withCookies(Workout);
