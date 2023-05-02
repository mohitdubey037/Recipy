import { RecipeTag } from "../../interfaces";
import * as mapper from "./mapper";
import * as service from "../../../db/services/TagService";
import { CreateTagDTO, UpdateTagDTO } from "../../dto/tag.dto";
// import { GetAllRecipesFilters } from "../../../db/dal/types";

export const create = async (payload: CreateTagDTO): Promise<RecipeTag> => {
  return mapper.toTag(await service.create(payload));
};

export const update = async (
  id: number,
  payload: UpdateTagDTO
): Promise<RecipeTag> => {
  return mapper.toTag(await service.update(id, payload));
};

export const getById = async (id: number): Promise<RecipeTag> => {
  return mapper.toTag(await service.getById(id));
};

export const deleteById = (id: number): Promise<boolean> => {
  return service.deleteById(id);
};

export const getAll = async (): Promise<RecipeTag[]> => {
  return (await service.getAll()).map(mapper.toTag);
};
