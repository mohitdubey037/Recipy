import Otp from "../models/Otp";
import { OtpInput, OtpOutput } from "../models/Otp";
import httpStatus from 'http-status';
import { Op } from "sequelize";

export const findById = async ({ email, otp }: {
    otp: number
    email: string
}): Promise<Object> => {
	const findUser = await Otp.findOne({ where: { email, otp } });

	if (!findUser) {
		throw new Error("No User found");
	}
	return findUser
};

export const createOtpService = async (body: OtpInput) => {
	const expiryDate = 30;
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

function moment() {
	throw new Error("Function not implemented.");
}
