import { TagOutput } from "../../../db/models/Tag";
import { RecipeTag } from "../../interfaces";

export const toTag = (tag: TagOutput): RecipeTag => ({
  id: tag.id,
  name: tag.name,
  slug: tag.slug,
  count: tag.count,
  createdAt: tag.createdAt,
  updatedAt: tag.updatedAt,
});
