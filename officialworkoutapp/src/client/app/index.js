import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import fitnessApp from './reducers';
import App from './components/App';
import {fetchExercises, fetchSets, fetchWorkouts} from './actions';
import thunkMiddlware from 'redux-thunk';
import {createLogger} from 'redux-logger';

const loggerMiddleware = createLogger();

const store = createStore(
  fitnessApp,
  applyMiddleware(
    thunkMiddlware,
    loggerMiddleware
  )
);

/*store.dispatch(fetchExercises())
  .then(() => {
    store.getState().exercises.forEach((exrc) => {
      store.dispatch(fetchSets(exrc.id))
    });
  });
*/

//console.log("-----DISPATCHING ADD WORKOUT-----");
//store.dispatch(addWorkout());
store.dispatch(fetchWorkouts());

render (
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
