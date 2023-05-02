import { isEmpty } from "lodash";
import { Category } from "../models";
import { CategoryInput, CategoryOutput } from "../models/Category";

export const getAll = async (): Promise<CategoryOutput[]> => {
  return Category.findAll();
};

export const create = async (
  payload: CategoryInput
): Promise<CategoryOutput> => {
  return Category.create(payload);
};

export const checkSlugExists = async (slug: string): Promise<boolean> => {
  const categorySlug = await Category.findOne({
    where: { slug },
  });

  return !isEmpty(categorySlug);
};

export const update = async (
  id: number,
  payload: Partial<CategoryInput>
): Promise<CategoryOutput> => {
  const cat = await Category.findByPk(id);

  if (!cat) {
    throw new Error("not found");
  }

  return cat.update(payload);
};

export const deleteById = async (id: number): Promise<boolean> => {
  const numDeletedCategories = await Category.destroy({ where: { id } });
  return !!numDeletedCategories;
};
