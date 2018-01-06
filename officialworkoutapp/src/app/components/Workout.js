import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const Workout = (props) => (
  <li className='list-group-item'>
    <Link to={`/exercises/${props.workout.id}`}>
      <p>{`Workout ${props.workout.id} `}</p>
    </Link>
    <p>{new Date(props.workout.date).toLocaleDateString('en-US')}</p>
  </li>
);

export default Workout;
