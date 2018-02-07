module.exports = `

  type Set {
    id: Int!
    weight: Float!
    repetitions: Int!
    createdAt: String!
    updatedAt: String!
  }

  type Exercise {
    id: Int!
    name: String!
    createdAt: String!
    updatedAt: String!
    sets: [Set]
  }

  type Workout {
    id: Int!
    date: String
    name: String
    createdAt: String!
    updatedAt: String!
    exercises: [Exercise]
  }

  type User {
    id: Int
    username: String
    createdAt: String
    updatedAt: String
    workouts: [Workout]
  }

  type TestObject {
    message: String!
  }

  type Query {
    user: User
    login(username: String!, password: String!): String
    getWorkouts: [Workout]
    getExercises(workoutId: Int!): [Exercise]
  }

  type Mutation {
    register(username: String!, password: String!, fname: String!, lname: String!): User
    addWorkout(name: String): Workout
    updateWorkoutName(workoutId: Int!, name: String!): Workout
    deleteWorkout(workoutId: Int!): String!
    addExercise(name: String!, workoutId: Int!): Exercise
    updateExerciseName(workoutId: Int!, exerciseId: Int!, name: String!): Exercise
    deleteExercise(workoutId: Int!, exerciseId: Int!): String!
    addSet(workoutId: Int!, exerciseId: Int!, weight: Float!, repetitions: Int!): Set
    updateSet(workoutId: Int!, exerciseId: Int!, setId: Int!, weight: Float!, repetitions: Int!): Set
    deleteSet(workoutId: Int!, exerciseId: Int!, setId: Int!): String!
  }
`;
