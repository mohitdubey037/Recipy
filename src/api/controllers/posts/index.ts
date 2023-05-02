import { Post} from '../../interfaces';
import * as mapper from "./mapper";
import * as service from "../../../db/services/PostService";

export const getAll = async (): Promise<Post[]> => {
  return (await service.getAll()).map(mapper.toPost);
}