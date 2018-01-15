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
          <h1 className='text-center'>Workout Tracker Home Page</h1>
          <LoginForm />
        </div>
      )} />
      <Route path={'/workoutlist'} render={() => (
        <WorkoutList user={store.getState().user} />
      )} />
      <Route path={'/exercises/:workoutId'} render={({match}) => (
        <div id='exerciselist'>
          <ExerciseList workoutId={match.params.workoutId} />
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
