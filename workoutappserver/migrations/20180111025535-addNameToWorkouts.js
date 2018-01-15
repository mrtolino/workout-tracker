'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('workout','name', {type: 'text'});
  },

  down: (queryInterface, Sequelize) => {

  }
};
