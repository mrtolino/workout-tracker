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

router.get('/workouts', function(req, res, next) {
  models.workout.findAll({}).then(function(workouts) {
    res.json(workouts);
  });
});

module.exports = router;
