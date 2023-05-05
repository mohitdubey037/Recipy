import { isEmpty } from "lodash";
import User, { UserInput } from "../models/Auth";
import { Op } from 'sequelize';
import httpStatus from 'http-status';
import { CreateUser } from "../../api/interfaces";
import { compare } from 'bcrypt';

export const findUserByEmail = async(email: string, type: string)=> {

    const findUser = await User.findOne({ where: { email: email } });

	if (type === 'register') {
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
	else if (type === 'login') {
		if (findUser) {
			return findUser;
		}
		else {
			const error = {
				status: httpStatus.CONFLICT,
				message: 'User not found!',
				success: false,
			};
			throw error;
		}
	}
	else {
		return null
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

export const comparePassword = (passwordAttempt: string, hashedPassword: string) => {
	return compare(passwordAttempt, hashedPassword);
};

// export const updateUser = async (updateData: Object, query: Object) => {
// 	const updatedUser = await User.update(updateData, query);
// 	if (!updatedUser) {
// 	  const error = {
// 		status: httpStatus.BAD_REQUEST,
// 		message: "Somthing went wrong to update the user!",
// 		success: false,
// 	  };
// 	  throw error;
// 	}
// 	return updatedUser;
// };