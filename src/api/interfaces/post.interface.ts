export interface Post {
  id: number;
  title: string;
  slug: string;
  feature_image: string;
  content: string;
  author: number;
  status: string;
  word_count: number;
  createdAt: Date;
  updatedAt: Date;
}
