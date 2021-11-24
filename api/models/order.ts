"use strict";
import { Model, UUIDV4 } from "sequelize";

interface OrderAttributes {
  id: string;
  firstname: string;
  lastname: string;
  address: string;
  email: string;
  city: string;
  postalcode: string;
  country: string;
  user_id: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Order extends Model<OrderAttributes> implements OrderAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    firstname!: string;
    lastname!: string;
    address!: string;
    email!: string;
    city!: string;
    postalcode!: string;
    country!: string;
    user_id!: string;
    static associate(models: any) {
      // define association here
      Order.belongsTo(models.User, { foreignKey: "user_id" });
      Order.belongsToMany(models.Product, {
        as: "Product",
        through: "orderproducts",
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
      firstname: {
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
      postalcode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Order",
      tableName: "orders",
      timestamps: false,
      underscored: true,
    }
  );
  return Order;
};
