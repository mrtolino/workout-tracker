'use strict';
module.exports = (sequelize, DataTypes) => {
  var exercise = sequelize.define('exercise', {
    name: DataTypes.STRING,
    workoutId: DataTypes.INTEGER
  }, {
    freezeTableName: true,
    tableName: 'exercise'
  });
  exercise.associate = function (models) {
    exercise.belongsTo(models.workout);
    exercise.hasMany(models.set);
  };
  return exercise;
};



// module.exports = (sequelize, DataTypes) => {
//   var exercise = sequelize.define('exercise', {
//     name: DataTypes.STRING,
//     workoutId: DataTypes.INTEGER
//   }, {
//     classMethods: {
//       associate: function(models) {
//         // associations can be defined here
//         exercise.belongsTo(models.workout);
//         exercise.hasMany(models.set);
//       }
//     },
//     freezeTableName: true,
//     tableName: 'exercise'
//   });
//   return exercise;
// };
