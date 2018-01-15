'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    username: DataTypes.STRING,
    password: DataTypes.TEXT,
    fname: DataTypes.STRING,
    lname: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        user.hasMany(models.workout);
      }
    },
    freezeTableName: true,
    tableName: 'user'
  });
  return user;
};
