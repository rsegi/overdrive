"use strict";
import { Model, UUIDV4 } from "sequelize";

export interface ProductAttributes {
  id: string;
  name: string;
  amount: number;
  price: number;
  image: string;
  description: string;
  id_category: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Product extends Model<ProductAttributes> implements ProductAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    name!: string;
    amount!: number;
    price!: number;
    image!: string;
    description!: string;
    id_category!: string;
    static associate(models: any) {
      // define association here
      Product.belongsToMany(models.Order, {
        through: "orderproducts",
      });
      Product.belongsTo(models.Category);
    }
  }
  Product.init(
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
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id_category: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "products",
      timestamps: false,
    }
  );
  return Product;
};
