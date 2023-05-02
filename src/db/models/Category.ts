import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";

interface CategoryAttributes {
  id: number;
  name: string;
  slug: string;
  count?: number;
  parent_id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface CategoryInput
  extends Optional<CategoryAttributes, "id" | "slug"> {}

export interface CategoryOutput extends Required<CategoryAttributes> {}

class Category
  extends Model<CategoryAttributes, CategoryInput>
  implements CategoryAttributes
{
  public id!: number;
  public name!: string;
  public slug!: string;
  public parent_id!: number;
  public count!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    parent_id: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize: sequelizeConnection,
    paranoid: true,
  }
);

export default Category;
