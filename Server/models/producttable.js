'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class producttable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      producttable.belongsTo(models.categories, {
        foreignKey: 'categoryid',
        targetKey: 'categoryid'
      });
    }
  }
  producttable.init({
    producttitle: DataTypes.STRING,
    brand: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    categoryid: DataTypes.STRING,
    imgname: DataTypes.STRING,
    imgname2: DataTypes.STRING,
    imgname3: DataTypes.STRING,
    imgname4: DataTypes.STRING,
    imgname5: DataTypes.STRING,
    imgname6: DataTypes.STRING,
    inStock: DataTypes.BOOLEAN,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'producttable',
  });
  return producttable;
};