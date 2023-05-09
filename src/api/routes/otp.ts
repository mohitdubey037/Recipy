import { Router, Request, Response } from "express";
import * as controller from "../controllers/otp";

import { emailVerification } from "../interfaces/otp.interface";

const otpRouter = Router();

otpRouter.post('/registerEmail', async (req: Request, res: Response) => {
    const payload:emailVerification = req.body;
    try {
        await controller.registerEmail(payload);
        return res.status(200).send('Email sent successfully');
    } catch (error: any) {
        console.log(error, 'error')
    }
})  

otpRouter.post('/verifyOtp',async (req: Request, res: Response) => {
    const payload: {
        otp: number
    } = req.body;
    try {
        await controller.verifyOtp(payload);
        return res.status(200).send({
            message: 'Otp verified successfully',
            success: true,
            flag: 1
        });
    }
    catch(error: any) {
        return res.status(404).send({
            message: error.message,
            success: false,
            flag: 0
        });
    }
})