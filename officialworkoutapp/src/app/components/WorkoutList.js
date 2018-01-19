import React from 'react';
import PropTypes from 'prop-types';
import Workout from './Workout';
import {connect} from 'react-redux';
import {withCookies} from 'react-cookie';
import {withRouter} from 'react-router-dom';

import {addWorkout, fetchWorkouts, deleteWorkout} from '../actions';

class WorkoutList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      workoutName: ''
    };
  }

  componentWillMount() {
    if (!this.props.cookies.get('token')) {
      this.props.history.push('/');
    }
  }

  componentDidMount() {
    this.props.onFetchWorkouts(this.props.cookies.get('token'));
  }

  onChangeWorkoutName(event) {
    this.setState({
      workoutName: event.target.value
    })
  }

  onAddWorkoutSubmit() {
    this.props.onAddWorkout(this.props.cookies.get('token'), this.state.workoutName);
    this.setState({
      workoutName: ''
    });
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
              value={this.state.workoutName} onChange={(e) => this.onChangeWorkoutName(e)} />
            <button className='btn btn-primary btn-margin-top no-gutters'
              onClick={() => this.onAddWorkoutSubmit()}>
              Add Workout
            </button>
          </div>
        </div>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <ul className='list-group no-gutters'>
              {
                this.props.workouts.map((workout, index) => (
                  <Workout key={index} workout={workout} workoutIndex={index} onDeleteWorkout={this.props.onDeleteWorkout} />
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    workouts: state.workouts
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddWorkout: (token, workoutName) => dispatch(addWorkout(token, workoutName)),
    onFetchWorkouts: (token) => dispatch(fetchWorkouts(token)),
    onDeleteWorkout: (token, workoutId, workoutIndex) => dispatch(deleteWorkout(token, workoutId, workoutIndex))
  };
};

WorkoutList.propTypes = {
  workouts: PropTypes.array.isRequired,
  onAddWorkout: PropTypes.func.isRequired,
  onFetchWorkouts: PropTypes.func.isRequired,
  onDeleteWorkout: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  cookies: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withCookies(WorkoutList)));
