"use strict";
import { Model, UUIDV4 } from "sequelize";

interface OrderProductAttributes {
  quantity: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class OrderProduct
    extends Model<OrderProductAttributes>
    implements OrderProductAttributes
  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    quantity!: number;
    static associate(models: any) {
      this.belongsToMany(models.Product, { through: "orderproducts" });
      this.belongsToMany(models.Order, { through: "orderproducts" });
      // define association here
    }
  }
  OrderProduct.init(
    {
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "OrderProduct",
      tableName: "orderproducts",
      timestamps: false,
      underscored: true,
    }
  );
  return OrderProduct;
};
