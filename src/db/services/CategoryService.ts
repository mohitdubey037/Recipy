import { CategoryInput, CategoryOutput } from "../models/Category";
import * as categoryDal from "../dal/category";
import { kebabCase } from "lodash";

export const getAll = (): Promise<CategoryOutput[]> => {
  return categoryDal.getAll();
};

export const create = async (
  payload: CategoryInput
): Promise<CategoryOutput> => {
  let slug = kebabCase(payload.name);
  const slugExists = await categoryDal.checkSlugExists(slug);

  payload.slug = slugExists
    ? `${slug} - ${Math.floor(Math.random() * 1000)}`
    : slug;

  return categoryDal.create(payload);
};

export const update = async (
  id: number,
  payload: Partial<CategoryInput>
): Promise<CategoryOutput> => {
  if (payload.name) {
    let slug = kebabCase(payload.name);
    const slugExists = await categoryDal.checkSlugExists(slug);

    payload.slug = slugExists
      ? `${slug} - ${Math.floor(Math.random() * 1000)}`
      : slug;
  }
  return categoryDal.update(id, payload);
};

export const deleteById = async (id: number): Promise<boolean> => {
  return categoryDal.deleteById(id);
};
