'use strict';
module.exports = (sequelize, DataTypes) => {
  var workout = sequelize.define('workout', {
    userId: DataTypes.INTEGER,
    name: DataTypes.TEXT,
    date: DataTypes.DATE
  }, {
    freezeTableName: true,
    tableName: 'workout'
  });
  workout.associate = function (models) {
    workout.hasMany(models.exercise);
    workout.belongsTo(models.user);
  };
  return workout;
};


// module.exports = (sequelize, DataTypes) => {
//   var workout = sequelize.define('workout', {
//     userId: DataTypes.INTEGER,
//     name: DataTypes.TEXT,
//     date: DataTypes.DATE
//   }, {
//     classMethods: {
//       associate: function(models) {
//         // associations can be defined here
//         workout.hasMany(models.exercise);
//         workout.belongsTo(models.user);
//       }
//     },
//     freezeTableName: true,
//     tableName: 'workout'
//   });
//   return workout;
// };
