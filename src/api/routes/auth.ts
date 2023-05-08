import { Router, Request, Response } from "express";
import * as controller from "../controllers/auth";

import { CreateUserDTO, LoginUserDTO } from "../dto/auth.dto";
import { emailVerification } from "../interfaces/auth.interface";

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

authRouter.post('/verifyEmail', async (req: Request, res: Response) => {
    const payload:emailVerification = req.body;
    try {
        const result = await controller.verifyEmail(payload);
        console.log(result, 'result');
        return res.status(200).send('Email sent successfully');
    } catch (error: any) {
        console.log(error, 'error')
    }
})  

authRouter.post('/verifyOtp',async (req: Request, res: Response) => {
    const payload: number = req.body
    await controller.verifyOtp(payload);
})



export default authRouter;