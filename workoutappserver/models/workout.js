'use strict';
module.exports = (sequelize, DataTypes) => {
  var workout = sequelize.define('workout', {
    date: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        workout.hasMany(models.exercise);
      }
    },
    freezeTableName: true,
    tableName: 'workout'
  });
  return workout;
};
