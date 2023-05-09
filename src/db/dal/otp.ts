import Otp from "../models/Auth";
import { OtpInput, OtpOutput } from "../models/Otp";
import httpStatus from 'http-status';

export const findById = async (otp: number): Promise<Object> => {
	// const findUser = await Otp.findOne({ where: { otp } });
    const findUser = {
        a: 'a',
        b: 'b'
    }
	if (!findUser) {
		throw new Error("No User found");
	}
	return findUser
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