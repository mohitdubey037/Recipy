import { PostInput, PostOutput } from "../models/Post";
import * as postDal from "../dal/posts";

export const getAll = (): Promise<PostOutput[]> => {
  return postDal.getAll();
};