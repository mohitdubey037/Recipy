import { CategoryOutput } from "../../../db/models/Category";
import { PostCategory } from "../../interfaces";

export const toCategory = (category: CategoryOutput): PostCategory => ({
  id: category.id,
  name: category.name,
  slug: category.slug,
  parent_id: category.parent_id,
  count: category.count,
  createdAt: category.createdAt,
  updatedAt: category.updatedAt,
});
