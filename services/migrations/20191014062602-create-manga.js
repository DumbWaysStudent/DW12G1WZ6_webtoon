'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('mangas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      author: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model : 'users',
          key : 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      synopsis : {
        type: Sequelize.TEXT
      },
      title: {
        type: Sequelize.STRING
      },
      genre: {
        type: Sequelize.STRING
      },
      cover: {
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        type: Sequelize.DATE
      },
  
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('mangas');
  }
};