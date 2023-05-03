import { Router } from "express";
import categoriesRouter from "./categories";
import ingredientsRouter from "./ingredients";
import recipesRouter from "./recipes";
import reviewsRouter from "./reviews";
import tagsRouter from "./tags";
import postsRouter from "./posts";
import authRouter from './auth';

const router = Router();

router.use("/categories", categoriesRouter);
router.use("/recipes", recipesRouter);
router.use("/ingredients", ingredientsRouter);
router.use("/reviews", reviewsRouter);
router.use("/tags", tagsRouter);
router.use("/posts", postsRouter);
router.use('/user', authRouter);

export default router;
