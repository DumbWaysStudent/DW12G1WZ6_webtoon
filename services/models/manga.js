'use strict';
module.exports = (sequelize, DataTypes) => {
  const manga = sequelize.define('manga', {
    //id: DataTypes.INTEGER,
    author: DataTypes.INTEGER,
    title: DataTypes.STRING,
    genre: DataTypes.STRING,
    cover: DataTypes.STRING,
    synopsis: DataTypes.TEXT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  manga.associate = function(models) {
    // associations can be defined here
    manga.belongsTo(models.users,{
      as : 'uri',
      foreignKey : 'author'
    })
  };
  return manga;
};