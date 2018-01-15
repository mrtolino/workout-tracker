'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.changeColumn('user', 'password',
    {
      type: Sequelize.TEXT,
      allowNull: false
    });
  },

  down: (queryInterface, Sequelize) => {

  }
};
