import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import userServices from './user.services';

const createUserController = catchAsync(async (req: Request, res: Response) => {
    const { user } = req.body;
    const result = await userServices.createUser(user);
    sendResponse(res, {
        success: true,
        message: 'User created successfully',
        data: result,
        statusCode: httpStatus.OK,
    });
});

const userControllers = {
    createUserController,
};

export default userControllers;
