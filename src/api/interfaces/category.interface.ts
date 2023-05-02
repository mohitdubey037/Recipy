export interface PostCategory {
  id: number;
  name: string;
  slug: string;
  parent_id: number;
  count: number;
  createdAt: Date;
  updatedAt: Date;
}
