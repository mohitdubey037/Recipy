import { Router, Request, Response } from "express";
import verifyToken from "../../middlewares/admin-auth";

import * as controller from "../controllers/tags";
import { CreateTagDTO } from "../dto/tag.dto";

const tagsRouter = Router();

tagsRouter.get("/", async (req: Request, res: Response) => {
  const results = await controller.getAll();
  return res.status(200).send(results);
});

tagsRouter.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const result = await controller.getById(id);
  return res.status(200).send(result);
});

tagsRouter.post("/", verifyToken, async (req: Request, res: Response) => {
  const payload: CreateTagDTO = req.body;

  const results = await controller.create(payload);
  return res.status(200).send(results);
});

tagsRouter.put("/:id", verifyToken, async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const payload: CreateTagDTO = req.body;

  const result = await controller.update(id, payload);
  return res.status(201).send(result);
});

tagsRouter.delete("/:id", verifyToken, async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const result = await controller.deleteById(id);
  return res.status(204).send({
    success: result,
  });
});

export default tagsRouter;
