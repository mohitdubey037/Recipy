import { DataTypes, Model } from "sequelize";

import sequelizeConnection from "../config";

import { Optional } from "sequelize";

interface UserAttribute {
    id: number;
    slug: string;
    name: string;
    email: string;
    password: string;
    // otp?: number; 
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserInput
  extends Optional<UserAttribute, "id" | "slug" | "password"> {}

export interface UserOutput extends Required<UserAttribute> {}

class User
  extends Model<UserAttribute, UserInput>
  implements UserAttribute
{
  public id!: number;
  public name!: string;
  public email!: string;
  public slug!: string;
  public password!: string;
  // public otp!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      // allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      // allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      // allowNull: true,
      // unique: true
    },
    // otp: {
    //   type: DataTypes.INTEGER,
    // },
  },
  {
    sequelize: sequelizeConnection,
    paranoid: true,
    timestamps: true,
  }
);

export default User;