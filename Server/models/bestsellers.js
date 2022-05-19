'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bestsellers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      bestsellers.hasOne(models.products, {
        sourceKey: 'productid',
        foreignKey: 'id',
      })
    }
  };
  bestsellers.init({
    productid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'bestsellers',
  });
  return bestsellers;
};