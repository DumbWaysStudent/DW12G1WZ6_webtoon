'use strict';
module.exports = (sequelize, DataTypes) => {
  const chapter = sequelize.define('chapter', {
    // id_chapter: DataTypes.INTEGER,
    manga: DataTypes.INTEGER,
    number :DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    
  }, {});
  chapter.associate = function(models) {
    // associations can be defined here
    chapter.belongsTo(models.manga,{
      as: 'mangas',
      foreignKey : 'manga'
    })
  };
  return chapter;
};