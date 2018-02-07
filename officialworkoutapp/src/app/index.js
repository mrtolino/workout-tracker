//library imports
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { CookiesProvider, Cookies } from 'react-cookie';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { setContext } from 'apollo-link-context';
import gql from 'graphql-tag';
import React from 'react';
import thunkMiddlware from 'redux-thunk';

//imports from my application
import FitnessApp from './reducers/reducers';
import {
  fetchExercises,
  fetchSets,
  fetchWorkouts
} from './actions';
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

const getCookie = (name) => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
};

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = getCookie('token');
  return {
    headers: {
      ...headers,
      authorization: token ? token : '',
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all'
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all'
    },
    mutate: {
      errorPolicy: 'all'
    }
  }
});

const App = () => (
  <Router>
    <Switch>
      <Route exact path={'/'} component={LoginForm} />
      <Route path={'/workoutlist'} component={WorkoutList} />
      <Route path={'/exercises/:workoutId'} component={ExerciseList} />
    </Switch>
  </Router>
);


render (
  <ApolloProvider client={client}>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </ApolloProvider>,
  document.getElementById('root')
);
