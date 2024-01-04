import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import academicSemesterServices from './academicSemester.services';

const createSemesterController = catchAsync(async (req: Request, res: Response) => {
    const { ...academicSemesterData } = req.body;
    const result = await academicSemesterServices.createSemester(academicSemesterData);

    sendResponse(res, {
        success: true,
        message: 'Academic semester is created successfully',
        data: result,
        statusCode: httpStatus.OK,
    });
});

const academicSemesterControllers = {
    createSemesterController,
};

export default academicSemesterControllers;
