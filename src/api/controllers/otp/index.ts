import * as service from "../../../db/services/OtpService";
import { emailVerification } from "../../interfaces/otp.interface";

export const registerEmail = async (payload:emailVerification) : Promise<any> => {
    return await service.registerEmail(payload);
}
  
export const verifyOtp = async (payload: {
    otp: number
    email: string
    }) : Promise<any> => {
    return await service.verifyOtp(payload);
}