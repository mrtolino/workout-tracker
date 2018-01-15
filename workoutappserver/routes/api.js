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
jwtOptions.secretOrKey = 'tasmanianDevil';

let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, done) {
  console.log('payload received', jwt_payload);
  models.user.findOne({
    where: {
      username: jwt_payload.username
    }
  }).then(function(user) {
    console.log("IN HERE!!!!!!!");
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
            var token = jwt.sign(payload, jwtOptions.secretOrKey);
            res.status(200).json({message: 'ok', token: token});
          } else {
            res.status(401).json('Invalid credentials.');
          }
        });
      } else {
        res.status(401).json('Invalid credentials.');
      }
    })
  }
});

router.get('/addworkout', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  models.workout.create({
    userId: req.user.id
  })
  .then(function(workout) {
    res.json(workout);
  });
});

router.post('/addexercise', function(req, res, next) {
  models.exercise.create({
    name: req.sanitize(req.body.name),
    workoutId: req.sanitize(req.body.workoutId)
  }).then(function(exrc) {
    res.json(exrc);
  });
});

router.post('/addset', function(req, res, next) {
  models.set.create({
    weight: Number(req.sanitize(String(req.body.weight))),
    repetitions: Number(req.sanitize(String(req.body.repetitions))),
    exerciseId: req.sanitize(req.body.exerciseId)
  }).then(function(set) {
    res.json(set);
  });
});

router.post('/updateset', function(req, res, next) {
  models.set.update({
    weight: Number(req.sanitize(String(req.body.weight))),
    repetitions: Number(req.sanitize(String(req.body.repetitions)))
  }, {
    where: {
      id: req.sanitize(req.body.setId),
      exerciseId: req.sanitize(req.body.exerciseId)
    }
  }).then(function(set) {
    res.json(set);
  })
});

router.post('/deleteset', function(req, res, next) {
  models.set.destroy({
    where: {
      id: req.sanitize(req.body.setId),
      exerciseId: req.sanitize(req.body.exerciseId)
    }
  }).then(function(numRowsDeleted) {
    res.json(numRowsDeleted);
  })
});

router.post('/deleteexercise', function(req, res, next) {
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
  })
});

router.post('/exercises', function(req, res, next) {
  models.exercise.findAll({
    where: {
      workoutId: req.sanitize(req.body.workoutId)
    }
  }).then(function(exrcs) {
    res.json(exrcs);
  });
});

router.post('/sets', function(req, res, next) {
  models.set.findAll({
    where: {
      exerciseId: req.sanitize(req.body.exerciseId)
    }
  }).then(function(sets) {
    res.json(sets);
  });
});

router.post('/deleteworkout', function(req, res, next) {
  let workoutId = req.sanitize(req.body.workoutId);

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
