"use strict";
import { Model, UUIDV4 } from "sequelize";

interface OrderAttributes {
  id: string;
  name: string;
  lastname: string;
  address: string;
  email: string;
  city: string;
  postal_code: string;
  country: string;
  UserId: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Order extends Model<OrderAttributes> implements OrderAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    name!: string;
    lastname!: string;
    address!: string;
    email!: string;
    city!: string;
    postal_code!: string;
    country!: string;
    UserId!: string;
    static associate(models: any) {
      // define association here
      Order.belongsTo(models.User);
      Order.belongsToMany(models.Product, {
        through: "OrderProducts",
      });
    }
  }
  Order.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postal_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      UserId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
