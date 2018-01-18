//library imports
import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createLogger} from 'redux-logger';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddlware from 'redux-thunk';
import {CookiesProvider} from 'react-cookie';

//imports from my application
import FitnessApp from './reducers/reducers';
import {fetchExercises, fetchSets, fetchWorkouts} from './actions';
import ExerciseList from './components/ExerciseList';
import WorkoutList from './components/WorkoutList';
import LoginForm from './components/LoginForm';


const loggerMiddleware = createLogger();

const store = createStore(
  FitnessApp,
  applyMiddleware(
    thunkMiddlware,
    loggerMiddleware
  )
);

const App = () => (
  <Router>
    <Switch>
      <Route exact path={'/'} render={() => (
        <div className='container'>
          <h1 className='title text-center'>Workout Tracker</h1>
          <LoginForm />
        </div>
      )} />
      <Route path={'/workoutlist'} render={() => (
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-md-8'>
              <h1 className='title'>Workout Tracker</h1>
            </div>
          </div>
          <WorkoutList />
        </div>
      )} />
      <Route path={'/exercises/:workoutId'} render={({match}) => (
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-md-8'>
              <h1 className='title'>Workout Tracker</h1>
            </div>
          </div>
          <ExerciseList workoutId={Number(match.params.workoutId)} />
        </div>
      )} />
    </Switch>
  </Router>
);

render (
  <Provider store={store}>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </Provider>,
  document.getElementById('root')
);
