'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.changeColumn(
      'workout',
      'userId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        },
        allowNull: false
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
