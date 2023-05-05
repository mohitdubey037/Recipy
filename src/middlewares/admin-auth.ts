import httpStatus from 'http-status';
import ENV from 'dotenv';
ENV.config();

import jsonwebtoken from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export interface IGetUserAuthInfoRequest extends Request {
  user?: Object // or any other type
}

const { verify } = jsonwebtoken;

const verifyToken = async (req: IGetUserAuthInfoRequest, res: Response, next:NextFunction) => {
	try {
		let token = req.headers.authorization?.split(' ')[1];

		if (!token) {
			return res.status(httpStatus.FORBIDDEN).send({
				message: 'A token is required for authentication!',
				status: httpStatus.FORBIDDEN,
				success: false,
			});
		}

		// get token in bearer
		if (req.headers.authorization) token = req.headers.authorization.split(' ')[1];

		const decoded = verify(token, process.env.SECRETKEY as string);

        if (decoded) {
            req.user = <any>decoded;
        }
	
	} catch (err) {
		return res.status(httpStatus.UNAUTHORIZED).send({
			message: 'Invalid Token!',
			status: httpStatus.UNAUTHORIZED,
			success: false,
		});
	}
	return next();
};

export default verifyToken;
