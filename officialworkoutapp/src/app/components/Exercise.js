import React from 'react';
import PropTypes from 'prop-types';
import ExerciseSet from './ExerciseSet';
import {connect} from 'react-redux';
import {withCookies} from 'react-cookie';

import {deleteExercise, addSet, fetchSets} from '../actions';
import DeleteConfirmationModal from './DeleteConfirmationModal';

class Exercise extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      collapseText: 'Collapse',
      renderConfirmationModal: false
    };

    this.onCloseConfirmationModal = this.onCloseConfirmationModal.bind(this);
    this.onConfirmDelete = this.onConfirmDelete.bind(this);
  }

  componentDidMount() {
    this.props.onFetchSets(this.props.cookies.get('token'), this.props.workoutId, this.props.exrc.id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.collapse && nextProps.exrc.exerciseSets.length > 0)
      this.setState({collapse: this.state.collapse, collapseText: this.state.collapseText});
    else {
      this.setState({collapse: false, collapseText: 'Collapse'});
    }
  }

  toggleCollapse() {
    let toggleCollapseText;
    if (this.props.exrc.exerciseSets.length === 0)
      return;

    if (this.state.collapseText === 'Collapse')
      toggleCollapseText = 'Expand';
    else
      toggleCollapseText = 'Collapse';

    this.setState({
      collapse: !this.state.collapse,
      collapseText: toggleCollapseText
    })
  }

  onConfirmDelete() {
    this.props.onDeleteExercise(this.props.cookies.get('token'), this.props.workoutId, this.props.exrc.id, this.props.exrcIndex);
    this.onCloseConfirmationModal();
  }

  onCloseConfirmationModal() {
    this.setState({renderConfirmationModal: false});
  }

  renderExerciseSets() {
    if (!this.state.collapse) {
      return (
        <div className='row'>
          <div className='col'>
            <ul className='list-group no-gutters'>
              {this.props.exrc.exerciseSets.sort((set1, set2) => {
                return set1.id > set2.id;
              }).map((set, index) => (<ExerciseSet key={index} index={index} workoutId={this.props.workoutId}
                exerciseId={this.props.exrc.id} setId={set.id} weight={set.weight} repetitions={set.repetitions}/>))}
            </ul>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <li className='list-group-item'>

        <div className='row'>
          <div className='col-10'>
            <h2 className='exrc-name float-left no-gutters'>{`${this.props.exrc.name} `}</h2>
          </div>
          <div className='col-2'>
            <button className='btn btn-danger float-right no-gutters' onClick={() => {
                this.setState({renderConfirmationModal: true})
              }}>
              ×
            </button>
          </div>
        </div>

        <div className='row'>
          <div className='col'>
            <button className='btn btn-primary float-left no-gutters' onClick={() => {
              this.props.onAddSet(this.props.cookies.get('token'), this.props.workoutId, this.props.exrc.id, 0, 0)
            }}>
              Add Set
            </button>
            <button className='btn btn-secondary' onClick={() => {
              this.toggleCollapse()
            }}>
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

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteExercise: (token, workoutId, exerciseId, exrcIndex) => {
      dispatch(deleteExercise(token, workoutId, exerciseId, exrcIndex))
    },
    onAddSet: (token, workoutId, exerciseId, weight, repetitions) => {
      dispatch(addSet(token, workoutId, exerciseId, weight, repetitions))
    },
    onFetchSets: (token, workoutId, exerciseId) => {
      dispatch(fetchSets(token, workoutId, exerciseId))
    }
  };
};

Exercise.propTypes = {
  key: PropTypes.number,
  workoutId: PropTypes.number.isRequired,
  exrcIndex: PropTypes.number.isRequired,
  exrc: PropTypes.object.isRequired,
  onDeleteExercise: PropTypes.func.isRequired,
  onAddSet: PropTypes.func.isRequired,
  onFetchSets: PropTypes.func.isRequired,
  cookies: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(Exercise));
