'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('favorites',[
      {
        manga:1,
        user:1,
        createdAt : Sequelize.fn('NOW'),
        updatedAt : Sequelize.fn('NOW')
      },
      {
        manga:1,
        user:2,
        createdAt : Sequelize.fn('NOW'),
        updatedAt : Sequelize.fn('NOW')
      }

    ],{})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('favorites',null,{})
  }
};
