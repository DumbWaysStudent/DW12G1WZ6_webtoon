'use strict';
module.exports = (sequelize, DataTypes) => {
  const image = sequelize.define('image', {
    chapter: DataTypes.INTEGER,
    image: DataTypes.STRING,
    page : DataTypes.INTEGER,
    manga : DataTypes.INTEGER
  }, {});
  image.associate = function(models) {
    // associations can be defined here
    image.belongsTo(models.chapter,{
      as : 'uri',
      foreignKey : 'chapter'
    })
  };
  return image;
};