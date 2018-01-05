import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const Workout = (props) => (
  <li>
    <Link to={`/exercises/${props.workout.id}`}>
      {`Workout ${props.workout.id} `}
    </Link>
  </li>
);

export default Workout;
