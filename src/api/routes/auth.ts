import { Router, Request, Response } from "express";
import * as controller from "../controllers/auth";
import httpStatus from 'http-status';


import { CreateUserDTO } from "../dto/auth.dto";

const authRouter = Router();

authRouter.post("/register", async (req: Request, res: Response) => {
    const payload: CreateUserDTO = req.body;
    try {
        const result = await controller.createUser(payload);
        res.status(httpStatus.OK).send({
            message: "User Registered successfully!",
            status: httpStatus.OK,
            result: result,
            success: true,
          });
    }
    catch(error: any) {
        res.status(error.status).send({
            message: error.message,
            status: error.status,
            success: error.success,
        });
    }
});

export default authRouter;