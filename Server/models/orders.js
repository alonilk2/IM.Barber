'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      orders.belongsTo(models.users, { targetKey: 'email', foreignKey: 'email', as: 'owner'})
    }
  }
  orders.init(
    {
      email: DataTypes.STRING,
      cart: DataTypes.STRING,
      price: DataTypes.DOUBLE,
      paymentid: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      shipped: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: 'orders'
    }
  )
  return orders
}
