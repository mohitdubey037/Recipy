import { Router, Request, Response } from "express";
import verifyToken from "../../middlewares/admin-auth";

import * as controller from "../controllers/category";
import { CreateCategoryDTO } from "../dto/category.dto";

const categoriesRouter = Router();

categoriesRouter.get("/", verifyToken, async (req: Request, res: Response) => {
  const results = await controller.getAll();
  return res.status(200).send(results);
});

categoriesRouter.get("/:slug", async (req: Request, res: Response) => {
  // get category by slug
  // load recipes related
});

categoriesRouter.post("/", verifyToken, async (req: Request, res: Response) => {
  // create food category
  const payload: CreateCategoryDTO = req.body;

  const results = await controller.create(payload);
  return res.status(200).send(results);
});

categoriesRouter.put("/:id", verifyToken, async (req: Request, res: Response) => {
  // update category
  const id = Number(req.params.id);
  const payload: CreateCategoryDTO = req.body;

  const results = await controller.update(id, payload);
  return res.status(200).send(results);
});

categoriesRouter.delete("/:id", verifyToken, async (req: Request, res: Response) => {
  // delete category
  const id = Number(req.params.id);

  const results = await controller.deleteById(id);
  return res.status(200).send(results);
});

export default categoriesRouter;
