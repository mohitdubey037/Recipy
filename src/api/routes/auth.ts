import { Router, Request, Response } from "express";
import * as authDal from '../../db/dal/auth'
import * as controller from "../controllers/auth";

import { CreateUserDTO, LoginUserDTO } from "../dto/auth.dto";

const authRouter = Router();

authRouter.post("/register", async (req: Request, res: Response) => {
    const payload: CreateUserDTO = req.body;
    try {
        const result = await controller.createUser(payload);
        return res.status(200).send(result);
    }
    catch(error: any) {
        res.status(error.status).send({
            message: error.message,
            status: error.status,
            success: error.success,
        });
    }
});

authRouter.post("/login", async (req: Request, res: Response) => {
    const payload: LoginUserDTO = req.body;
    try {
        const result = await controller.loginUser(payload);
        return res.status(200).send(result);
    }
    catch(error: any) {
        console.log(error, 'error');
    }
});

authRouter.post("/logout", async (req: Request, res: Response) => {
    // here we will remove the token if it is saved on backend
    return res.status(200).send([]);
});

export default authRouter;