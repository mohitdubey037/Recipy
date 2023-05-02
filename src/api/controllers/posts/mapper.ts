import { PostOutput } from '../../../db/models/Post';
import { Post } from "../../interfaces";

export const toPost = (post: PostOutput): Post => ({
  id: post.id,
  title: post.title,
  slug: post.slug,
  feature_image: post.feature_image,
  content: post.content,
  author: post.author,
  status: post.status,
  word_count: post.word_count,
  createdAt: post.createdAt,
  updatedAt: post.updatedAt
})