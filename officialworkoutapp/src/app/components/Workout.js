import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const Workout = (props) => (
  <li className='list-group-item'>
    <div className='float-left'>
      <Link to={`/exercises/${props.workout.id}`}>
        <p>{`Workout ${props.workout.id} `}</p>
      </Link>
      <p>{new Date(props.workout.date).toLocaleDateString('en-US')}</p>
    </div>
    <div className='float-right'>
      <button className='btn btn-danger'
        onClick={() => props.onDeleteWorkout(props.workout.id, props.workoutIndex)}>
        Delete
      </button>
    </div>
  </li>
);

export default Workout;
