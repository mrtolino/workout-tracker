import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';
import PropTypes from 'prop-types';
import React from 'react';
import { withCookies } from 'react-cookie';
import { withRouter } from 'react-router-dom';
import Workout from './Workout';

import { addWorkout, fetchWorkouts, deleteWorkout } from '../actions';

class WorkoutList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      workoutName: '',
      loading: true,
      workouts: []
    };

    this.onAddWorkout = this.onAddWorkout.bind(this);
    this.onDeleteWorkout = this.onDeleteWorkout.bind(this);
    this.onChangeWorkoutName = this.onChangeWorkoutName.bind(this);
  }

  componentWillMount() {
    if (!this.props.cookies.get('token')) {
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.data.loading) {
      this.setState({
        loading: false,
        workouts: nextProps.data.getWorkouts
      })
    }
  }

  onAddWorkout() {
    this.props.client.mutate({
      mutation: gql`
        mutation AddWorkout($name: String) {
          addWorkout(name: $name) {
            id,
            date,
            name
          }
        }
      `,
      variables: {
        name: this.state.workoutName
      }
    })
    .then(response => {
      this.setState({
        workouts: [
          ...this.state.workouts,
          response.data.addWorkout
        ]
      })
    });

    this.setState({
      workoutName: ''
    });
  }

  onDeleteWorkout(workoutId, workoutIndex) {
    this.props.client.mutate({
      mutation: gql`
        mutation DeleteWorkout($workoutId: Int!) {
          deleteWorkout(workoutId: $workoutId)
        }
      `,
      variables: {
        workoutId: workoutId
      }
    })
    .then(response => {
      if (response.data.deleteWorkout === 'Success') {
        this.setState({
          workouts: [
            ...this.state.workouts.slice(0, workoutIndex),
            ...this.state.workouts.slice(workoutIndex + 1)
          ]
        })
      }
    })
  }

  onChangeWorkoutName(event) {
    this.setState({
      workoutName: event.target.value
    })
  }

  render() {
    return (
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <button className='btn btn-primary btn-margin-bottom no-gutters float-right' onClick={() => {
              this.props.cookies.remove('token');
              this.props.history.push('/');
            }}>
              Logout
            </button>
            <input className='form-control input-margin-top' type='text' placeholder='workout name (optional)'
              value={this.state.workoutName} onChange={this.onChangeWorkoutName} />
            <button className='btn btn-primary btn-margin-top no-gutters'
              onClick={this.onAddWorkout}>
              Add Workout
            </button>
          </div>
        </div>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <ul className='list-group no-gutters'>
              {
                this.state.workouts.map((workout, index) => (
                  <Workout key={workout.id} workout={workout} workoutIndex={index} onDeleteWorkout={this.onDeleteWorkout} />
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

WorkoutList.propTypes = {
  history: PropTypes.object.isRequired,
  cookies: PropTypes.object.isRequired
};

const FETCH_WORKOUTS_QUERY = gql`
  query FetchWorkouts {
    getWorkouts {
      id,
      date,
      name
    }
  },
`;

export default graphql(FETCH_WORKOUTS_QUERY,
  {
    options: {
      fetchPolicy: 'cache-and-network'
    }
  }
)(withApollo(withRouter(withCookies(WorkoutList))));
