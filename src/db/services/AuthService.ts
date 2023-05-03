import { UserInput, UserOutput } from "../models/Auth";
import * as authDal from "../dal/auth";
import { kebabCase } from "lodash";
import { hash, genSalt } from 'bcrypt';


const hashPassword = async(password: string) : Promise<string> => {
    const saltRounds = 10;
    // Generate a salt at level 10 strength
    const salt = await genSalt(saltRounds);
    const hashPassword = await hash(password, salt);
    return hashPassword;
}

export const createUser = async (
    payload: UserInput
): Promise<any> => {
    // let slug = kebabCase(payload.name);
    const findUser = await authDal.findUserByEmail(payload.email);
    const hashed = await hashPassword(payload?.password);

    payload.password = hashed
    const result = await authDal.createUserService(payload);
    return result; 
}