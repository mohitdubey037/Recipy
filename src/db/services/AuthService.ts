import { UserInput, UserOutput } from "../models/Auth";
import nodemailer from 'nodemailer';
import * as authDal from "../dal/auth";
import { hash, genSalt } from 'bcrypt';
import { LoginUserDTO } from "../../api/dto/auth.dto";
import httpStatus from "http-status";
import { sign } from 'jsonwebtoken';
import ENV from 'dotenv';
import { emailVerification } from "../../api/interfaces/auth.interface";
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

const generateOTP = (): number => {
  var minm = 100000;
  var maxm = 999999;
  const freshOtp =  Math.floor(Math.random() * (maxm - minm + 1)) + minm;
  return freshOtp;
}

export const createUser = async (
    payload: UserInput
): Promise<any> => {
    // let slug = kebabCase(payload.name);
    if (payload.password) {
      const hashed = await hashPassword(payload?.password);
      payload.password = hashed;
      const findUser = await authDal.findUserByEmailAndUpdate(payload);
    }

    // const result = await authDal.createUserService(payload);
    return {}; 
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

export const registerEmail = async (payload:emailVerification): Promise<any> => {
  // let testAccount = await nodemailer.createTestAccount();
  let generatedOtp = generateOTP();

  try {
    let transporter = await nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'abigayle.reilly@ethereal.email', // generated ethereal user
        pass: '5c7bvXkbwpmQsWHavV' // generated ethereal password
      }
    })
  
    let info = await transporter.sendMail({
      from: '"mohit dubey " <abigayle.reilly@ethereal.email>', // sender address
      to: `${payload.email}`, // list of receivers
      subject: "E-Mail Verification", // subject line
      text: "Email Generation Successfully.You must have received the Otp for validation", // plain text body
      html: `
      <div>
        <h3>Welcome to the club</h3>
        <h3>Below is the generated Otp</h3>
        <h3>${generatedOtp}</h3>
      </div>
      `
    })

    let otpPayload = {
      email: payload.email,
      otp: generatedOtp
    }

    await authDal.createUserService(otpPayload);

  }

  catch(error){
    throw error
  }
  //connect with the smtp

  // return info;
}

export const verifyOtp = async(payload: {
  otp: number
}) : Promise<any> => {
  await authDal.findById(payload.otp)
}