import { RequestHandler } from 'express';
import userServices from './user.services';

const createUserController: RequestHandler = async (req, res, next) => {
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

const userControllers = {
    createUserController,
};

export default userControllers;
