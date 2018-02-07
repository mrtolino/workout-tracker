'use strict';
module.exports = (sequelize, DataTypes) => {
  var set = sequelize.define('set', {
    weight: DataTypes.INTEGER,
    repetitions: DataTypes.INTEGER,
    exerciseId: DataTypes.INTEGER
  }, {
    freezeTableName: true,
    tableName: 'set'
  });
  set.associate = function (models) {
    set.belongsTo(models.exercise);
  };
  return set;
};



// module.exports = (sequelize, DataTypes) => {
//   var set = sequelize.define('set', {
//     weight: DataTypes.INTEGER,
//     repetitions: DataTypes.INTEGER,
//     exerciseId: DataTypes.INTEGER
//   }, {
//     classMethods: {
//       associate: function(models) {
//         // associations can be defined here
//         set.belongsTo(models.exercise);
//       }
//     },
//     freezeTableName: true,
//     tableName: 'set'
//   });
//   return set;
// };
