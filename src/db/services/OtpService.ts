import nodemailer from 'nodemailer';
import * as otpDal from "../dal/otp";
import ENV from 'dotenv';
import { emailVerification } from "../../api/interfaces/otp.interface";
ENV.config();


const generateOTP = (): number => {
    var minm = 100000;
    var maxm = 999999;
    const freshOtp =  Math.floor(Math.random() * (maxm - minm + 1)) + minm;
    return freshOtp;
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
  
      await otpDal.createOtpService(otpPayload);
  
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
    await otpDal.findById(payload.otp)
}