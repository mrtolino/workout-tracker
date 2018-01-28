'use strict';
module.exports = (sequelize, DataTypes) => {
  var temp_user = sequelize.define('temp_user', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    fname: DataTypes.STRING,
    lname: DataTypes.STRING,
    hash: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    freezeTableName: true,
    tableName: 'temp_user'
  });
  return temp_user;
};
