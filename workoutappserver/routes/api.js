var models = require('../models/index');
var express = require('express');
var router = express.Router();

router.get('/addworkout', function(req, res, next) {
  models.workout.create({})
  .then(function(workout) {
    res.json(workout);
  });
});

router.post('/addexercise', function(req, res, next) {
  models.exercise.create({
    name: req.body.name,
    workoutId: req.body.workoutId
  }).then(function(exrc) {
    res.json(exrc);
  });
});

router.post('/addset', function(req, res, next) {
  console.log(req.body);
  models.set.create({
    weight: req.body.weight,
    repetitions: req.body.repetitions,
    exerciseId: req.body.exerciseId
  }).then(function(set) {
    res.json(set);
  });
});

router.post('/updateset', function(req, res, next) {
  models.set.update({
    weight: req.body.weight,
    repetitions: req.body.repetitions
  }, {
    where: {
      id: req.body.setId,
      exerciseId: req.body.exerciseId
    }
  }).then(function(set) {
    res.json(set);
  })
});

router.post('/deleteset', function(req, res, next) {
  models.set.destroy({
    where: {
      id: req.body.setId,
      exerciseId: req.body.exerciseId
    }
  }).then(function(numRowsDeleted) {
    res.json(numRowsDeleted);
  })
});

router.post('/deleteexercise', function(req, res, next) {
  models.set.destroy({
    where: {
      exerciseId: req.body.exerciseId
    }
  }).then(function() {
    models.exercise.destroy({
      where: {
        id: req.body.exerciseId
      }
    }).then(function() {
      res.json('EXERCISE DELETED SUCCESSFULLY');
    })
  })
});

router.post('/exercises', function(req, res, next) {
  models.exercise.findAll({
    where: {
      workoutId: req.body.workoutId
    }
  }).then(function(exrcs) {
    res.json(exrcs);
  });
});

router.post('/sets', function(req, res, next) {
  models.set.findAll({
    where: {
      exerciseId: req.body.exerciseId
    }
  }).then(function(sets) {
    console.log(sets);
    res.json(sets);
  });
});

router.get('/workouts', function(req, res, next) {
  models.workout.findAll({}).then(function(workouts) {
    res.json(workouts);
  });
});

module.exports = router;
