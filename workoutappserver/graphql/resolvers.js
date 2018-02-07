const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;
// const JwtStrategy = passportJWT.Strategy;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey =
  'se@nT0l1n01sAw3s0m3V3ryC001@n#$^*()32$$$^1243288Yklsfwi^7#@!90&&$253!325edds##@$!@(#*$&KDksdlfkjwoeiKDhemdhJFS,djsw)';

module.exports = {

  Set: {
    id: (parent, args, context) => {
      return parent.id;
    },
    weight: (parent, args, context) => {
      return parent.weight;
    },
    repetitions: (parent, args, context) => {
      return parent.repetitions;
    },
    createdAt: (parent, args, context) => {
      return parent.createdAt;
    },
    updatedAt: (parent, args, context) => {
      return parent.updatedAt;
    }
  },

  Exercise: {
    id: (parent, args, context) => {
      return parent.id;
    },
    name: (parent, args, context) => {
      return parent.name ? parent.name : null;
    },
    createdAt: (parent, args, context) => {
      return parent.createdAt ? parent.createdAt : null;
    },
    updatedAt: (parent, args, context) => {
      return parent.updatedAt ? parent.updatedAt : null;
    },
    sets: async (parent, args, context) => {
      if (parent.id) {
        const models = context.models;

        const result = models.set.findAll({
          where: {
            exerciseId: parent.id
          }
        });
        return result ? result : null;
      } else {
        return null;
      }
    }
  },

  Workout: {
    id: (parent, args, context) => {
      return parent.id;
    },
    date: (parent, args, context) => {
      return parent.date ? parent.date : null;
    },
    name: (parent, args, context) => {
      return parent.name ? parent.name : null;
    },
    createdAt: (parent, args, context) => {
      return parent.createdAt ? parent.createdAt : null;
    },
    updatedAt: (parent, args, context) => {
      return parent.updatedAt ? parent.updatedAt : null;
    },
    exercises: async (parent, args, context) => {
      if (parent.id) {
        const models = context.models;

        const result = await models.exercise.findAll({
          where: {
            workoutId: parent.id
          }
        });
        return result ? result : null;
      } else {
        return null;
      }
    }
  },

  User: {
    id: (parent, args, context) => {
      return parent.id;
    },
    username: (parent, args, context) => {
      return parent.username ? parent.username : null;
    },
    createdAt: (parent, args, context) => {
      return parent.createdAt ? parent.createdAt : null;
    },
    updatedAt: (parent, args, context) => {
      return parent.updatedAt ? parent.updatedAt : null;
    },
    workouts: async (parent, args, context) => {
      if (parent.id) {
        const models = context.models;

        const result = await models.workout.findAll({
          where: {
            userId: parent.id
          }
        });
        return result ? result : null;
      } else {
        return null;
      }
    }
  },

  TestObject: {
    message: (parent, args, context) => {
      return parent;
    }
  },

  Query: {
    user: async (parent, args, context) => {
      const models = context.models;

      if (context.userId) {
        const result = await models.user.findOne({
          where: {
            id: context.userId
          }
        });
        return result ? result : null;
      } else {
        return null;
      }
    },
    login: async (parent, args, context) => {
      const user = args;
      const models = context.models;

      const result = await models.user.findOne({
        where: {
          username: user.username
        }
      });
      if (result) {
        const valid = await bcrypt.compare(user.password, result.password);
        if (valid) {
          const payload = {id: result.id};
          const token = jwt.sign(payload, jwtOptions.secretOrKey, {expiresIn: '1h'});
          return token;
        } else {
          return 'Invalid credentials';
        }
      } else {
        return 'Invalid credentials';
      }
    },
    getWorkouts: async (parent, args, context) => {
      const models = context.models;

      if (context.userId) {
        const result = await models.workout.findAll({
          where: {
            userId: context.userId
          }
        });
        return result ? result : null;
      } else {
        return null;
      }
    },
    getExercises: async (parent, args, context) => {
      const models = context.models;

      if (context.userId) {
        const result = await models.workout.findAll({
          where: {
            id: args.workoutId,
            userId: context.userId
          }
        });
        if (result) {
          const exercises = await models.exercise.findAll({
            where: {
              workoutId: args.workoutId
            }
          });
          return exercises ? exercises : null;
        }
      }
    }
  },

  Mutation: {
    register: async (parent, args, context) => {
      const models = context.models;

      const hashedPass = await bcrypt.hash(args.password, 12);
      const result = await models.user.create({
        username: args.username,
        password: hashedPass,
        fname: args.fname,
        lname: args.lname
      });
      if (result) {
        return result;
      }
    },
    addWorkout: async (parent, args, context) => {
      const models = context.models;

      if (context.userId) {
        const result = await models.workout.create({
          userId: context.userId,
          name: args.name
        })
        if (result) {
          return result;
        }
      } else {
        return "Invalid user";
      }
    },
    updateWorkoutName: async (parent, args, context) => {
      const models = context.models;

      if (context.userId) {
        const result = await models.workout.update(
          {
            name: args.name
          },
          {
            where: {
              id: args.workoutId,
              userId: context.userId
            },
            returning: true
          }
        );
        return result[0] === 1 ? result[1][0] : null;
      } else {
        return null;
      }
    },
    deleteWorkout: async (parent, args, context) => {
      const models = context.models;

      if (context.userId) {
        const result = await models.workout.destroy({
          where: {
            id: args.workoutId,
            userId: context.userId
          }
        });
        return result ? "Success" : "Invalid ID";
      } else {
        return "Invalid user";
      }
    },
    addExercise: async (parent, args, context) => {
      const models = context.models;

      if (context.userId) {
        const check = await models.workout.findOne({
          where: {
            id: args.workoutId,
            userId: context.userId
          }
        });
        if (check) {
          const result = await models.exercise.create(
            {
              name: args.name,
              workoutId: args.workoutId
            }
          );
          return result ? result : null;
        } else {
          return null;
        }
      } else {
        return null;
      }
    },
    updateExerciseName: async (parent, args, context) => {
      const models = context.models;

      if (context.userId) {
        const check = await models.workout.findOne({
          where: {
            id: args.workoutId,
            userId: context.userId
          }
        });
        if (check) {
          const result = await models.exercise.update(
            {
              name: args.name
            },
            {
              where: {
                id: args.exerciseId,
                workoutId: args.workoutId
              },
              returning: true
            }
          );
          return result[0] === 1 ? result[1][0] : null;
        } else {
          return null;
        }
      } else {
        return null;
      }
    },
    deleteExercise: async (parent, args, context) => {
      const models = context.models;

      if (context.userId) {
        const check = await models.workout.findOne({
          where: {
            id: args.workoutId,
            userId: context.userId
          }
        });
        if (check) {
          const result = await models.exercise.destroy({
            where: {
              id: args.exerciseId,
              workoutId: args.workoutId
            }
          });
          return result ? "Success" : "Invalid ID";
        }
      } else {
        return "Invalid user";
      }
    },
    addSet: async (parent, args, context) => {
      const models = context.models;

      if (context.userId) {
        const check = await models.workout.findOne({
          where: {
            id: args.workoutId,
            userId: context.userId
          }
        });
        if (check) {
          const check2 = await models.exercise.findOne({
            where: {
              id: args.exerciseId,
              workoutId: args.workoutId
            }
          });
          if (check2) {
            const result = await models.set.create({
              weight: args.weight,
              repetitions: args.repetitions,
              exerciseId: args.exerciseId
            });
            return result ? result : null;
          } else {
            return null;
          }
        } else {
          return null;
        }

      } else {
        return null;
      }
    },
    updateSet: async (parent, args, context) => {
      const models = context.models;

      if (context.userId) {
        const check = await models.workout.findOne({
          where: {
            id: args.workoutId,
            userId: context.userId
          }
        });
        if (check) {
          const check2 = await models.exercise.findOne({
            where: {
              id: args.exerciseId,
              workoutId: args.workoutId
            }
          });
          if (check2) {
            const result = await models.set.update(
              {
                weight: args.weight,
                repetitions: args.repetitions
              },
              {
                where: {
                  id: args.setId
                },
                returning: true
              }
            );
            return result[0] === 1 ? result[1][0] : null;
          } else {
            return null;
          }
        } else {
          return null;
        }

      } else {
        return null;
      }
    },
    deleteSet: async (parent, args, context) => {
      const models = context.models;

      if (context.userId) {
        const check = await models.workout.findOne({
          where: {
            id: args.workoutId,
            userId: context.userId
          }
        });
        if (check) {
          const check2 = await models.exercise.findOne({
            where: {
              id: args.exerciseId,
              workoutId: args.workoutId
            }
          });
          if (check2) {
            const result = await models.set.destroy({
              where: {
                id: args.setId
              }
            });
            return result ? "Success" : "Invalid ID";
          } else {
            return null;
          }
        } else {
          return null;
        }
      } else {
        return null;
      }
    }
  }
};
