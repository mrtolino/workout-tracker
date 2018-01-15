'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable(
      'user',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        username: {
          type: Sequelize.STRING,
          allowNull: false
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false
        },
        fname: {
          type: Sequelize.STRING
        },
        lname: {
          type: Sequelize.STRING
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false
        }
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.dropTable('user');
  }
};
