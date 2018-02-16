import React from 'react';
import PropTypes from 'prop-types';
import ExerciseSet from './ExerciseSet';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { withCookies } from 'react-cookie';
import { withApollo } from 'react-apollo';

import { deleteExercise, addSet, fetchSets, updateExerciseName } from '../actions';
import DeleteConfirmationModal from './DeleteConfirmationModal';

class Exercise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      collapseText: 'Collapse',
      renderConfirmationModal: false,
      editExerciseName: false,
      exrcName: this.props.exrc.name,
      sets: [],
    };

    this.onCloseConfirmationModal = this.onCloseConfirmationModal.bind(this);
    this.onConfirmDelete = this.onConfirmDelete.bind(this);
    this.onAddSet = this.onAddSet.bind(this);
    this.onUpdateSet = this.onUpdateSet.bind(this);
    this.onDeleteSet = this.onDeleteSet.bind(this);
    this.onExrcNameChange = this.onExrcNameChange.bind(this);
    this.onSubmitEditExrcName = this.onSubmitEditExrcName.bind(this);
  }

  componentDidMount() {
    this.setState({
      sets: this.props.exrc.sets,
    });
  }

  toggleCollapse() {
    let toggleCollapseText;
    if (this.state.sets.length === 0) { return; }

    if (this.state.collapseText === 'Collapse') { toggleCollapseText = 'Expand'; } else { toggleCollapseText = 'Collapse'; }

    this.setState({
      collapse: !this.state.collapse,
      collapseText: toggleCollapseText,
    });
  }

  onUpdateSet(workoutId, exerciseId, setId, setIndex, weight, repetitions) {
    this.props.client.mutate({
      mutation: gql`
        mutation UpdateSet($workoutId: Int!, $exerciseId: Int!, $setId: Int!, $weight: Float!, $repetitions: Int!) {
          updateSet(workoutId: $workoutId, exerciseId: $exerciseId, setId: $setId, weight: $weight, repetitions: $repetitions) {
            id,
            weight,
            repetitions
          }
        }
      `,
      variables: {
        workoutId,
        exerciseId,
        setId,
        weight,
        repetitions,
      },
    })
      .then((response) => {
        if (response.data.updateSet) {
          this.setState({
            sets: [
              ...this.state.sets.slice(0, setIndex),
              response.data.updateSet,
              ...this.state.sets.slice(setIndex + 1),
            ],
          });
        } else {
        // handle error
        }
      });
  }

  onAddSet(workoutId, exerciseId, weight, repetitions) {
    this.props.client.mutate({
      mutation: gql`
        mutation AddSet($workoutId: Int!, $exerciseId: Int!, $weight: Float!, $repetitions: Int!) {
          addSet(workoutId: $workoutId, exerciseId: $exerciseId, weight: $weight, repetitions: $repetitions) {
            id,
            weight,
            repetitions
          }
        }
      `,
      variables: {
        workoutId,
        exerciseId,
        weight,
        repetitions,
      },
    })
      .then((response) => {
        if (response.data.addSet) {
          this.setState({
            sets: [
              ...this.state.sets,
              response.data.addSet,
            ],
          });
        } else {
        // handle error
        }
      });
  }

  onDeleteSet(workoutId, exerciseId, setId, setIndex) {
    this.props.client.mutate({
      mutation: gql`
        mutation DeleteSet($workoutId: Int!, $exerciseId: Int!, $setId: Int!) {
          deleteSet(workoutId: $workoutId, exerciseId: $exerciseId, setId: $setId)
        }
      `,
      variables: {
        workoutId,
        exerciseId,
        setId,
      },
    })
      .then((response) => {
        if (response.data.deleteSet === 'Success') {
          this.setState({
            sets: [
              ...this.state.sets.slice(0, setIndex),
              ...this.state.sets.slice(setIndex + 1),
            ],
          });
        }
      });
  }

  onConfirmDelete() {
    this.props.onDeleteExercise(this.props.workoutId, this.props.exrc.id, this.props.exrcIndex);
    this.onCloseConfirmationModal();
  }

  onCloseConfirmationModal() {
    this.setState({ renderConfirmationModal: false });
  }

  onExrcNameChange(event) {
    this.setState({
      exrcName: event.target.value,
    });
  }

  onSubmitEditExrcName() {
    if (this.props.exrc.name !== this.state.exrcName) {
      this.props.onUpdateExerciseName(this.props.workoutId, this.props.exrc.id, this.props.exrcIndex, this.state.exrcName);
    }
    this.setState({
      editExerciseName: false,
    });
  }

  renderExerciseSets() {
    if (!this.state.collapse) {
      return (
        <div className="grid-x grid-margin-x">
          <div className="cell">
            <ul className="list-group bordered">
              {[...this.state.sets].sort((set1, set2) => set1.id > set2.id).map((set, index) => (
                <ExerciseSet
                  key={set.id}
                  index={index}
                  workoutId={this.props.workoutId}
                  exerciseId={this.props.exrc.id}
                  set={set}
                  onUpdateSet={this.onUpdateSet}
                  onDeleteSet={this.onDeleteSet}
                />
              ))}
            </ul>
          </div>
        </div>
      );
    }
  }

  renderExerciseNameAndDeleteButton() {
    if (this.state.editExerciseName) {
      return (
        <div className="grid-x">
          <div className="small-10 cell">
            <div className="input-group">
              <span className="input-group-label">Name</span>
              <input className="input-group-field" type="text" value={this.state.exrcName} onChange={this.onExrcNameChange}/>
              <div className="input-group-button">
                <input type="button" className="hollow button success" value="✓" onClick={this.onSubmitEditExrcName} />
              </div>
            </div>
          </div>
          <div className="small-2 cell">
            <button
              className="hollow button secondary float-right"
              onClick={() => {
                this.setState({ renderConfirmationModal: true });
              }}
            >
              &times;
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="grid-x grid-margin-x">
        <div className="cell">
          <h2
            className="exrc-name float-left"
            onClick={() =>
              this.setState({ editExerciseName: true })}
          >
            {`${this.props.exrc.name} `}
          </h2>
          <button
            className="hollow button secondary float-right"
            onClick={() => {
              this.setState({ renderConfirmationModal: true });
            }}
          >
            &times;
          </button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <li className="list-group-item">

        {this.renderExerciseNameAndDeleteButton()}

        <div className="grid-x grid-margin-x">
          <div className="cell">
            <button
              className="hollow button secondary btn-margin-right"
              onClick={() => {
              this.onAddSet(this.props.workoutId, this.props.exrc.id, 0, 0);
            }}
            >
              Add Set
            </button>
            <button
              className="hollow button secondary"
              onClick={() => {
              this.toggleCollapse();
            }}
            >
              {this.state.collapseText}
            </button>
          </div>
        </div>

        <DeleteConfirmationModal
          renderConfirmationModal={this.state.renderConfirmationModal}
          onCloseConfirmationModal={this.onCloseConfirmationModal}
          onConfirmDelete={this.onConfirmDelete}
        />

        {this.renderExerciseSets()}

      </li>
    );
  }
}

Exercise.propTypes = {
  key: PropTypes.number,
  workoutId: PropTypes.number.isRequired,
  exrcIndex: PropTypes.number.isRequired,
  exrc: PropTypes.object.isRequired,
  cookies: PropTypes.object.isRequired,
};

export default withApollo(withCookies(Exercise));
