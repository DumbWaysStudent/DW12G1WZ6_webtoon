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
   return queryInterface.bulkInsert('mangas',[
    {
      author : 1,
      title : 'Boku No Pico',
      genre : 'Echi',
      synopsis : 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate',
      cover : 'https://www.forbes.com/sites/joanmacdonald.jpg',
      createdAt : Sequelize.fn('NOW'),
      updatedAt : Sequelize.fn('NOW')
    },
    {
      author : 1,
      title : 'Sunarto',
      genre : 'Adventure',
      synopsis : 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate',
      cover : 'https://www.forbes.com/sites/joanmacdonald.jpg',
      createdAt : Sequelize.fn('NOW'),
      updatedAt : Sequelize.fn('NOW')
    },
    {
      author : 2,
      title : 'One Piece',
      genre : 'Adventure',
      synopsis : 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate',
      cover : 'https://www.forbes.com/sites/joanmacdonald.jpg',
      createdAt : Sequelize.fn('NOW'),
      updatedAt : Sequelize.fn('NOW')
    },
   ],{})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('users', null, {});
  }
};
