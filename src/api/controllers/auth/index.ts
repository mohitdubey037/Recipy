import { CreateUserDTO, LoginUserDTO } from "../../dto/auth.dto";
import { CreateUser, LoginUser } from "../../interfaces";

import * as mapper from "./mapper"

import * as service from "../../../db/services/AuthService";
import { emailVerification } from "../../interfaces/auth.interface";

export const createUser = async (
    payload: CreateUserDTO
  ): Promise<CreateUser> => {
    return mapper.ToAuth(await service.createUser(payload));
  };

export const loginUser = async (
  payload: LoginUserDTO
): Promise<LoginUser> => {
  return await service.loginUser(payload);
};
  
export const verifyEmail = async (payload:emailVerification) : Promise<any> => {
  return await service.verifyEmail(payload);
  // console.log('hii verifyEmail');
}

export const verifyOtp = async (payload: number) : Promise<any> => {
  return await service.verifyOtp(payload)
}
