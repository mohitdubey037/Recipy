import { Post } from "../models";
import { PostInput, PostOutput } from "../models/Post";

export const getAll = async (): Promise<PostOutput[]> => {
  return Post.findAll();
};