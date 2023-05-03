import { CreateUserDTO } from "../../dto/auth.dto";
import { CreateUser } from "../../interfaces";

import * as mapper from "./mapper"

import * as service from "../../../db/services/AuthService";

export const createUser = async (
    payload: CreateUserDTO
  ): Promise<CreateUser> => {
    return mapper.ToAuth(await service.createUser(payload));
  };