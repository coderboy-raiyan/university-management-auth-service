import { NextFunction, Request, Response } from 'express';
import userServices from './user.services';

const createUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user } = req.body;
        const result = await userServices.createUser(user);
        return res.status(200).json({
            success: true,
            message: 'User created successfully',
            user: result,
        });
    } catch (error) {
        next(error);
    }
};

export default {
    createUserController,
};
