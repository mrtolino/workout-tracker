'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    username: DataTypes.STRING,
    password: DataTypes.TEXT,
    fname: DataTypes.STRING,
    lname: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'user'
  });
  user.associate = function (models) {
    user.hasMany(models.workout);
  };
  return user;
};
