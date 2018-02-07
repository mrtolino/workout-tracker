import React from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {withCookies} from 'react-cookie';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';

import Exercise from './Exercise';
import {addExercise, fetchExercises, clearExercises} from '../actions';

class ExerciseList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      exercises: []
    };

    this.onAddExercise = this.onAddExercise.bind(this);
    this.onDeleteExercise = this.onDeleteExercise.bind(this);
  }

  componentWillMount() {
    if (!this.props.cookies.get('token')) {
      this.props.history.push('/');
    }
  }

  componentDidMount() {
    this.props.client.query({
      query: gql`
        query FetchExercises($workoutId: Int!) {
          getExercises(workoutId: $workoutId) {
            id,
            name,
            sets {
              id,
              weight,
              repetitions
            }
          }
        }
      `,
      variables: {
        workoutId: this.props.match.params.workoutId
      },
      options: {
        fetchPolicy: 'cache-and-network'
      }
    })
    .then(response => {
      this.setState({
        exercises: response.data.getExercises
      })
      console.log(this.state.exercises);
    });
  }

  componentWillUnmount() {
    // this.props.onUnmount();
  }

  onAddExercise(name, workoutId) {
    this.props.client.mutate({
      mutation: gql`
        mutation AddExercise($name: String!, $workoutId: Int!) {
          addExercise(name: $name, workoutId: $workoutId) {
            id,
            name,
            sets {
              id,
              weight,
              repetitions
            }
          }
        }
      `,
      variables: {
        name: name,
        workoutId: workoutId
      }
    })
    .then(response => {
      this.setState({
        exercises: [
          ...this.state.exercises,
          response.data.addExercise
        ]
      });
    });
  }

  onDeleteExercise(workoutId, exerciseId, exrcIndex) {
    this.props.client.mutate({
      mutation: gql`
        mutation DeleteExercise($workoutId: Int!, $exerciseId: Int!) {
          deleteExercise(workoutId: $workoutId, exerciseId: $exerciseId)
        }
      `,
      variables: {
        workoutId: workoutId,
        exerciseId: exerciseId
      }
    })
    .then(response => {
      if (response.data.deleteExercise === 'Success') {
        this.setState({
          exercises: [
            ...this.state.exercises.slice(0, exrcIndex),
            ...this.state.exercises.slice(exrcIndex + 1)
          ]
        })
      }
    });
  }

  renderFooterExerciseNameInput() {
    if (this.state.exercises.length > 0) {
      return (
        <div>
          <div className='row justify-content-center'>
            <div className='col-md-10'>
              <input className='form-control input-margin-top' placeholder='Enter a name' maxLength='30' ref={node => {
                this.footerExrcName = node;
              }} />
            </div>
          </div>
          <div className='row justify-content-center'>
            <div className='col-md-10'>
              <button className='btn btn-primary btn-margin-top btn-margin-bottom no-gutters' onClick={() => {
                if (this.footerExrcName.value !== '') {
                  this.onAddExercise(this.footerExrcName.value, this.props.match.params.workoutId)
                  this.footerExrcName.value = '';
                }
              }}>
                Add Exercise
              </button>
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className='container'>

        <div className='row justify-content-center'>
          <div className='col-md-10'>
            <button className='btn btn-primary btn-margin-top no-gutters float-right' onClick={() => {
              this.props.cookies.remove('token');
              this.props.history.push('/');
            }}>
              Logout
            </button>
            <Link to={'/workoutlist'}>
              <button className='btn btn-primary btn-margin-top no-gutters float-left'>Back to Workout List</button>
            </Link>
          </div>
        </div>

        <div className='row justify-content-center'>
          <div className='col-md-10'>
            <h4 className='exrc-name-label'>Exercise Name: </h4>
          </div>
        </div>

        <div className='row justify-content-center'>
          <div className='col-md-10'>
            <input className='form-control' placeholder='Enter a name' maxLength='30' ref={node => {
              this.exrcName = node;
            }} />
          </div>
        </div>

        <div className='row justify-content-center'>
          <div className='col-md-10'>
            <button className='btn btn-primary btn-margin-top no-gutters' onClick={() => {
              if (this.exrcName.value !== '') {
                this.onAddExercise(this.exrcName.value, this.props.match.params.workoutId);
                this.exrcName.value = '';
              }
            }}>
              Add Exercise
            </button>
          </div>
        </div>

        <div className='row justify-content-center'>
          <div className='col-md-10'>
            <ul className='list-group no-gutters'>
              {this.state.exercises.map((exrc, index) => (
                <Exercise key={index} workoutId={Number(this.props.match.params.workoutId)} exrcIndex={index}
                  exrc={exrc} onDeleteExercise={this.onDeleteExercise}/>
              ))}
            </ul>
          </div>
        </div>

        {this.renderFooterExerciseNameInput()}

      </div>
    );
  }
};

ExerciseList.propTypes = {
  // exercises: PropTypes.array.isRequired,
  // onAddExercise: PropTypes.func.isRequired,
  // onFetchExercises: PropTypes.func.isRequired,
  // onUnmount: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  cookies: PropTypes.object.isRequired
};

export default withApollo(withRouter(withCookies(ExerciseList)));
