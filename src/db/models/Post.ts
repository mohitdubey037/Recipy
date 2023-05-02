import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";

interface PostAttributes {
  id: number;
  title: string;
  slug: string;
  feature_image: string;
  content: string;
  author: number;
  status?: string;
  word_count?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface PostInput
  extends Optional<PostAttributes, "id" | "slug"> {}

export interface PostOutput extends Required<PostAttributes> {}

class Post
  extends Model<PostAttributes, PostInput>
  implements PostAttributes
{
  public id!: number;
  public title!: string;
  public slug!: string;
  public feature_image!: string;
  public content!: string;
  public author!: number;
  public status!: string;
  public word_count!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    feature_image: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "unpublish"
    },
    word_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize: sequelizeConnection,
    paranoid: true,
  }
);

export default Post;
