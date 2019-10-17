'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('favorites', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      manga: {
        type: Sequelize.INTEGER,
        references:{
          model : 'mangas',
          key : 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      user: {
        type: Sequelize.INTEGER,
        references:{
          model : 'users',
          key : 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('favorites');
  }
};