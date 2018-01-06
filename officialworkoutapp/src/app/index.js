//library imports
import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createLogger} from 'redux-logger';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddlware from 'redux-thunk';

//imports from my application
import FitnessApp from './reducers/reducers';
import {fetchExercises, fetchSets, fetchWorkouts} from './actions';
import ExerciseList from './components/ExerciseList';
import WorkoutList from './components/WorkoutList';


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
        <h1>Workout Tracker Home Page</h1>
      )} />
      <Route path={'/workoutlist'} component={WorkoutList} />
      <Route path={'/exercises/:workoutId'} render={({match}) => (
        <ExerciseList workoutId={match.params.workoutId} />
      )} />
    </Switch>
  </Router>
);

render (
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
