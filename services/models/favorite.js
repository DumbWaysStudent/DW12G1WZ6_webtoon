'use strict';
module.exports = (sequelize, DataTypes) => {
  const favorite = sequelize.define('favorite', {
    manga: DataTypes.INTEGER,
    user: DataTypes.INTEGER
  }, {});
  favorite.associate = function(models) {
    // associations can be defined here
    favorite.belongsTo(models.users,{
      as : 'uri',
      foreignKey : 'user'
    }),
    favorite.belongsTo(models.manga,{
      as: 'mangas',
      foreignKey : 'manga'
    })
  };
  return favorite;
};