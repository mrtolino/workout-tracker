import React from 'react';
import PropTypes from 'prop-types';
import ExerciseSet from './ExerciseSet';

class Exercise extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.onFetchSets(this.props.workoutId, this.props.exrc.id);
  }

  render() {
    return (
      <div>
        <li>
          {`${this.props.exrc.name} `}
          <button onClick={() => {
            this.props.onAddSet(this.props.workoutId, this.props.exrc.id, 0, 0)
          }}>
            +
          </button>

          <button onClick={() => {
            this.props.onDeleteExercise(this.props.workoutId, this.props.exrc.id, this.props.exrcIndex)
          }}>
            Delete Exercise
          </button>

          <ul>
            {this.props.exrc.exerciseSets.sort((set1, set2) => {
              return set1.id > set2.id;
            })
            .map((set, index) => (
              <ExerciseSet key={set.id} index={index} workoutId={this.props.workoutId} exerciseId={this.props.exrc.id} setId={set.id}
                weight={set.weight} repetitions={set.repetitions} onUpdateSet={this.props.onUpdateSet} onDeleteSet={this.props.onDeleteSet} />
            ))}
          </ul>
        </li>
      </div>
    );
  }
}

/*Exercise.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};*/

export default Exercise;
