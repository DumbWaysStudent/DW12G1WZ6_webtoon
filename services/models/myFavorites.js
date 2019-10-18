'use strict';
module.exports = (sequelize, DataTypes) => {
  const myFavorites = sequelize.define('myFavorites', {
    // id_chapter: DataTypes.INTEGER,
    updatedAt: DataTypes.DATE,
    user :DataTypes.INTEGER,
    title : DataTypes.STRING,
    cover: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    
  }, {});
  myFavorites.associate = function(models) {
    // associations can be defined here
  
  };
  return myFavorites;
};