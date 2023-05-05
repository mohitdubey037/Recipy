import { Optional } from "sequelize/types";

export type CreateUserDTO = {
  name: string;
  email: string;
  password: string;
  slug: string;
};

export type LoginUserDTO = {
  email: string;
  password: string;
}