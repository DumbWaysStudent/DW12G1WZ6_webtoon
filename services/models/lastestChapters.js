'use strict';
module.exports = (sequelize, DataTypes) => {
  const lastestChapters = sequelize.define('lastestChapters', {
    // id_chapter: DataTypes.INTEGER,
    updatedAt: DataTypes.DATE,
    number :DataTypes.INTEGER,
    title: DataTypes.STRING,
    cover: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    
  }, {});
  lastestChapters.associate = function(models) {
    // associations can be defined here
  
  };
  return lastestChapters;
};