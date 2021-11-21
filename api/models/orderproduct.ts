"use strict";
import { Model, UUIDV4 } from "sequelize";

interface OrderProductAttributes {
  order_id: string;
  product_id: string;
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
    order_id!: string;
    product_id!: string;
    quantity!: number;
    static associate(models: any) {
      // define association here
    }
  }
  OrderProduct.init(
    {
      order_id: DataTypes.UUID,
      product_id: DataTypes.UUID,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "OrderProduct",
      tableName: "orderproducts",
      timestamps: false,
      underscored: true
    }
  );
  return OrderProduct;
};
