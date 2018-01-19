var models = require('../models/index');
var express = require('express');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var passportJWT = require('passport-jwt');
var bcrypt = require('bcrypt');

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var router = express.Router();

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey =
  'se@nT0l1n01sAw3s0m3V3ryC001@n#$^*()32$$$^1243288Yklsfwi^7#@!90&&$253!325edds##@$!@(#*$&KDksdlfkjwoeiKDhemdhJFS,djsw)';

let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, done) {
  models.user.findOne({
    where: {
      username: jwt_payload.username
    }
  }).then(function(user) {
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});
passport.use(strategy);

router.post('/createaccount', function(req, res, next) {
  const saltRounds = 10;
  if (req.body.username && req.body.password) {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      if (hash) {
        models.user.create({
          username: req.body.username,
          password: hash,
          fname: req.body.fname,
          lname: req.body.lname
        }).then(function(user) {
          res.json(user);
        })
      }
    });
  }
});

router.post('/login', function(req, res, next) {
  if (req.body.username && req.body.password) {
    models.user.findOne({
      where: {
        username: req.body.username
      }
    }).then(function(user) {
      if (user) {
        bcrypt.compare(req.body.password, user.password)
        .then(function(result) {
          if (result === true) {
            var payload = {username: user.username};
            var token = jwt.sign(payload, jwtOptions.secretOrKey, {expiresIn: '1h'});
            res.status(200).json({message: 'ok', token: token});
          } else {
            res.status(401).json({message: 'Invalid credentials.'});
          }
        });
      } else {
        res.status(401).json({message: 'Invalid credentials.'});
      }
    })
  }
});

router.post('/addworkout', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  models.workout.create({
    userId: req.user.id,
    name: req.sanitize(req.body.workoutName)
  })
  .then(function(workout) {
    res.json(workout);
  });
});

router.post('/addexercise', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  models.workout.findAll({
    where: {
      id: req.body.workoutId,
      userId: req.user.id
    }
  }).then(function(workouts) {
    if (workouts.length === 0) {
      res.status(401).json('Invalid user.');
    } else {
      models.exercise.create({
        name: req.sanitize(req.body.name),
        workoutId: req.sanitize(req.body.workoutId)
      }).then(function(exrc) {
        res.json(exrc);
      });
    }
  });
});

router.post('/addset', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  models.workout.findAll({
    where: {
      id: req.body.workoutId,
      userId: req.user.id
    }
  }).then(function(workouts) {
    if (workouts.length === 0) {
      res.status(401).json('Invalid request.');
    } else {
      models.set.create({
        weight: Number(req.sanitize(String(req.body.weight))),
        repetitions: Number(req.sanitize(String(req.body.repetitions))),
        exerciseId: req.body.exerciseId
      }).then(function(set) {
        res.json(set);
      });
    }
  });
});

router.post('/updateset', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  models.workout.findAll({
    where: {
      id: req.body.workoutId,
      userId: req.user.id
    }
  }).then(function(workouts) {
    if (workouts.length === 0) {
      res.status(401).json('Invalid request.');
    } else {
      models.set.update({
        weight: Number(req.sanitize(String(req.body.weight))),
        repetitions: Number(req.sanitize(String(req.body.repetitions)))
      }, {
        where: {
          id: req.sanitize(req.body.setId),
          exerciseId: req.sanitize(req.body.exerciseId)
        }
      }).then(function(set) {
        res.json({message: 'success'});
      }).catch(function(error) {
        res.json({message: 'failed'})
      });
    }
  })
});

router.post('/deleteset', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  models.workout.findAll({
    where: {
      id: req.body.workoutId,
      userId: req.user.id
    }
  }).then(function(workouts) {
    if (workouts.length === 0) {
      res.status(401).json('Invalid request.');
    } else {
      models.set.destroy({
        where: {
          id: req.sanitize(req.body.setId),
          exerciseId: req.sanitize(req.body.exerciseId)
        }
      }).then(function(numRowsDeleted) {
        res.json(numRowsDeleted);
      });
    }
  });
});

router.post('/deleteexercise', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  models.workout.findAll({
    where: {
      id: req.body.workoutId,
      userId: req.user.id
    }
  }).then(function(workouts) {
    if (workouts.length === 0) {
      res.status(401).json('Invalid request.');
    } else {
      models.set.destroy({
        where: {
          exerciseId: req.sanitize(req.body.exerciseId)
        }
      }).then(function() {
        models.exercise.destroy({
          where: {
            id: req.sanitize(req.body.exerciseId)
          }
        }).then(function() {
          res.json('EXERCISE DELETED SUCCESSFULLY');
        })
      });
    }
  })
});

router.post('/exercises', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  models.workout.findAll({
    where: {
      id: req.body.workoutId,
      userId: req.user.id
    }
  }).then(function(workouts) {
    if (workouts.length === 0) {
      res.status(401).json('Invalid user.');
    } else {
      models.exercise.findAll({
        where: {
          workoutId: req.body.workoutId
        }
      }).then(function(exrcs) {
        res.json(exrcs);
      });
    }
  })
});

router.post('/sets', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  models.workout.findAll({
    where: {
      id: req.body.workoutId,
      userId: req.user.id
    }
  }).then(function(workouts) {
    if (workouts.length === 0) {
      res.status(401).json('Invalid request.');
    } else {
      models.set.findAll({
        where: {
          exerciseId: req.sanitize(req.body.exerciseId)
        }
      }).then(function(sets) {
        res.json(sets);
      });
    }
  });
});

router.post('/deleteworkout', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  let workoutId = req.body.workoutId;

  //check if this workout belongs to the authorized user
  models.workout.findAll({
    where: {
      id: workoutId,
      userId: req.user.id
    }
  }).then(function(workouts) {
    if (workouts.length === 0) {
      res.status(401).json('Invalid user.');
    } else {
      //if it does, then delete the workout
      models.exercise.findAll({
        where: {
          workoutId: workoutId
        }
      }).then(function(exrcs) {
        exrcs.forEach((exrc) => {
          models.set.destroy({
            where: {
              exerciseId: exrc.id
            }
          })
        })
      }).then(() => {
        models.exercise.destroy({
          where: {
            workoutId: workoutId
          }
        })
      }).then(() => {
        models.workout.destroy({
          where: {
            id: workoutId
          }
        })
      }).then(function() {
        res.json('SUCCESS');
      });
    }
  });
});

router.get('/workouts', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  models.workout.findAll({
    where: {
      userId: req.user.id
    }
  }).then(function(workouts) {
    res.json(workouts);
  });
});

module.exports = router;
