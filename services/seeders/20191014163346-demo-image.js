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
    return queryInterface.bulkInsert('images',[
    {
      manga:1,
      page:1,
      chapter:1,
      image:'https://www.forbes.com/sites/joanmacdonald.jpg',
      createdAt:Sequelize.fn('NOW'),
      updatedAt:Sequelize.fn('NOW')
    },
    {
      manga:1,
      page:2,
      chapter:1,
      image:'https://www.forbes.com/sites/joanmacdonald.jpg',
      createdAt:Sequelize.fn('NOW'),
      updatedAt:Sequelize.fn('NOW')
    },
  ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('images',null,{})
  }
};
