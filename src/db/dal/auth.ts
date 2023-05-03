import { isEmpty } from "lodash";
import User, { UserInput } from "../models/Auth";
import { Op } from 'sequelize';
import httpStatus from 'http-status';
import { CreateUser } from "../../api/interfaces";


export const findUserByEmail = async( email: string ): Promise<Object | null> => {

    const findUser = await User.findOne({ where: { email: email } });
   
	if (findUser) {
		const error = {
			status: httpStatus.CONFLICT,
			message: 'User already registered!',
			success: false,
		};
		throw error;
	}
	else {
		return findUser;
	}
}

export const createUserService = async (body: UserInput) => {
	const createUser = await User.create(body);
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