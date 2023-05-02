import { Optional } from "sequelize/types";

export type CreateTagDTO = {
  name: string;
  slug: string;
  count?: number;
};

export type UpdateTagDTO = Optional<CreateTagDTO, "name">;
