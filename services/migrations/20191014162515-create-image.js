'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      chapter: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model : 'chapters',
          key : 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      manga:{
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model : 'mangas',
          key : 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      image: {
        type: Sequelize.STRING
      },
      page:{
        type : Sequelize.INTEGER
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
    return queryInterface.dropTable('images');
  }
};