import { Router, Request, Response} from 'express';

import * as controller from "../controllers/posts";

const postsRouter = Router();

postsRouter.get('/', async (req: Request, res: Response) => {
  const results = await controller.getAll();
  return res.status(200).send(results);
})

export default postsRouter;