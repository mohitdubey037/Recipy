import { PostCategory } from "../../interfaces";
import * as mapper from "./mapper";
import * as service from "../../../db/services/CategoryService";
import { CreateCategoryDTO, UpdateCategoryDTO } from "../../dto/category.dto";

export const getAll = async (): Promise<PostCategory[]> => {
  return (await service.getAll()).map(mapper.toCategory);
};

export const create = async (
  payload: CreateCategoryDTO
): Promise<PostCategory> => {
  return mapper.toCategory(await service.create(payload));
};

export const update = async (
  id: number,
  payload: UpdateCategoryDTO
): Promise<PostCategory> => {
  return mapper.toCategory(await service.update(id, payload));
};

export const deleteById = async (id: number): Promise<boolean> => {
  return service.deleteById(id);
};
