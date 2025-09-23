import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Product extends Model {
  public id!: number;
  public name!: string;
  public price!: number;
  public description!: string;
}

Product.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    productUrl: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    stock: { type: DataTypes.INTEGER, allowNull: true },
    description: { type: DataTypes.STRING, allowNull: true },
  },
  { sequelize, tableName: "products" }
);

export default Product;
