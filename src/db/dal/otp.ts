import Otp from "../models/Otp";
import { OtpInput, OtpOutput } from "../models/Otp";
import httpStatus from 'http-status';
import { Op } from "sequelize";

export const deleteById = async (otp: number): Promise<boolean> => {
    const deleteOtp = await Otp.destroy({
        where: {otp}
    })

    return !!deleteOtp
}
 
export const findById = async ({ email, otp }: {
    otp: number
    email: string
}): Promise<any> => {
	const findUser = await Otp.findOne({ where: { email, otp } });

	const date: Date = new Date();

	if (!findUser) {
		throw new Error("OTP Invalid");
	}

	else {
		const validUntil = new Date(findUser?.otpExpires); 
		if (validUntil <= date) {
			throw new Error("Token has been expired")
		}
		else {
			return findUser
		}
	}
};

export const createOtpService = async (body: OtpInput) => {
	const createUser = await Otp.create(body);
	if (!createUser) {
		const error = {
			status: httpStatus.NOT_FOUND,
			message: 'Somthing went wrong!',
			success: false,
		};
		throw error;
	}
	return createUser;
};
