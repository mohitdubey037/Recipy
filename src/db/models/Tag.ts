import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";

interface TagAttributes {
  id: number;
  name: string;
  slug: string;
  count?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface TagInput extends Optional<TagAttributes, "id" | "slug"> {}

export interface TagOutput extends Required<TagAttributes> {}

class Tag extends Model<TagAttributes, TagInput> implements TagAttributes {
  public id!: number;
  public name!: string;
  public slug!: string;
  public count!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Tag.init(
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

export default Tag;
