import { UserInput, UserOutput } from "../models/Auth";
import * as authDal from "../dal/auth";
import { hash, genSalt } from 'bcrypt';
import { LoginUserDTO } from "../../api/dto/auth.dto";
import httpStatus from "http-status";
import { sign } from 'jsonwebtoken';
import ENV from 'dotenv';
ENV.config();

const hashPassword = async(password: string) : Promise<string> => {
    const saltRounds = 10;
    // Generate a salt at level 10 strength
    const salt = await genSalt(saltRounds);
    const hashPassword = await hash(password, salt);
    return hashPassword;
}

export const verifyPassword = async (password: any, hashedpassword: any) => {
    const verifyPassword = await authDal.comparePassword(password, hashedpassword);
    if (!verifyPassword) {
      const error = {
        status: httpStatus.BAD_REQUEST,
        message: "User email or password is not matched",
        success: false,
      };
      throw error;
    }
    return verifyPassword;
};

const generateJWTToken = (payload: Object) => {
  const secret: string = process.env.SECRETKEY as string;
  let token = sign(payload, secret, { expiresIn: '72h' });
	return token;
};

export const createUser = async (
    payload: UserInput
): Promise<any> => {
    // let slug = kebabCase(payload.name);
    const findUser = await authDal.findUserByEmail(payload.email, 'register');
    const hashed = await hashPassword(payload?.password);

    payload.password = hashed;
    const result = await authDal.createUserService(payload);
    return result; 
}

export const loginUser = async (
    payload: LoginUserDTO
): Promise <any> => {
    const findUser: UserOutput | null = await authDal.findUserByEmail(payload.email, 'login');

    if (findUser !== null) {
      const payloadForToken = {
        id: findUser?.id,
        name: findUser?.name,
        email: findUser?.email,
      };
      const a = await verifyPassword(payload.password, findUser?.password);
      const token = generateJWTToken(payloadForToken);
      return token;
    }

    return null;

}