import { Optional } from "sequelize/types";

export type CreateCategoryDTO = {
  name: string;
  slug: string;
  parent_id: number;
  count: number;
};

export type UpdateCategoryDTO = Optional<CreateCategoryDTO, "name">;
