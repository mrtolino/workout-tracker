import React from 'react';
import ExerciseList from './ExerciseList';
import WorkoutList from './WorkoutList';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

const App = () => (
  <div>
    <Router>
      <Switch>
        <Route exact path='/' component={WorkoutList} />
        <Route path='/exercises/:workoutid' component={ExerciseList} />
      </Switch>
    </Router>
  </div>
);

export default App;
