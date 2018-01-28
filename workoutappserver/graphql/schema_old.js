const fetch = require('node-fetch');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList
} = require('graphql');

const LoginType = new GraphQLObjectType({
  name: 'Login',
  description: '...',

  fields: () => ({
    message: {
      type: GraphQLString,
      resolve: (parent) => parent.message
    },
    token: {
      type: GraphQLString,
      resolve: (parent) => parent.token
    }
  })
});

const WorkoutType = new GraphQLObjectType({
  name: 'Workout',
  description: 'A single workout.',

  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve: (parent) => {
        if (parent.id) {
          return parent.id;
        } else {
          return null;
        }
      }
    },
    name: {
      type: GraphQLString,
      resolve: (parent) => {
        if (parent.name) {
          return parent.name;
        } else {
          return null;
        }
      }
    },
    exercises: {
      type: GraphQLList(ExerciseType),
      args: {
        token: { type: GraphQLString }
      },
      resolve: (parent, args) => fetch(
        'http://localhost:3000/api/exercises',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'Authorization': 'JWT ' + args.token
          },
          body: JSON.stringify({
            workoutId: parent.id
          })
        }
      )
      .then(response => response.json())
      .catch(error => error)
    }
  })
});

const ExerciseType = new GraphQLObjectType({
  name: 'Exercise',
  description: 'A single exercise.',

  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: (parent) => {
        if (parent.name) {
          return parent.name
        } else {
          return null;
        }
      }
    }
  })
});

const Schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: '...',

    fields: () => ({
      login: {
        type: LoginType,
        args: {
          username: { type: GraphQLString },
          password: { type: GraphQLString }
        },
        resolve: (parent, args) => fetch(
          'http://localhost:3000/api/login',
            {
              method: 'POST',
              headers: {
                'content-type': 'application/json'
              },
              body: JSON.stringify({
                username: args.username,
                password: args.password
              })
            }
          )
          .then(response => response.json())
      },
      workouts: {
        type: GraphQLList(WorkoutType),
        args: {
          token: { type: GraphQLString }
        },
        resolve: (parent, args) => fetch(
          'http://localhost:3000/api/workouts',
            {
              method: 'GET',
              headers: {
                'Authorization': 'JWT ' + args.token
              }
            }
          )
          .then(response => response.json())
          .catch(error => error)
      }
    })
  })
});

module.exports = Schema;
