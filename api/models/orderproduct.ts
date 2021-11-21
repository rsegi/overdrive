"use strict";
import { Model, UUIDV4 } from "sequelize";

interface OrderProductAttributes {
  id_order: string;
  id_product: string;
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
    id_order!: string;
    id_product!: string;
    quantity!: number;
    static associate(models: any) {
      // define association here
    }
  }
  OrderProduct.init(
    {
      id_order: DataTypes.UUID,
      id_product: DataTypes.UUID,
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
