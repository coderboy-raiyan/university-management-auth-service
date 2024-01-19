import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { PaginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicSemester } from './academicSemester.interface';
import academicSemesterServices from './academicSemester.services';

const createSemesterController = catchAsync(async (req: Request, res: Response) => {
    const { ...academicSemesterData } = req.body;
    const result = await academicSemesterServices.createSemester(academicSemesterData);

    sendResponse<IAcademicSemester>(res, {
        success: true,
        message: 'Academic semester is created successfully',
        data: result,
        statusCode: httpStatus.OK,
    });
});

const getAllSemesterController = catchAsync(async (req: Request, res: Response) => {
    const paginationOptions = pick(req.query, PaginationFields);
    const result = await academicSemesterServices.getAllSemesters(paginationOptions);
    sendResponse<IAcademicSemester[]>(res, {
        success: true,
        message: 'Academic semesters retrieved successfully',
        statusCode: httpStatus.OK,
        ...result,
    });
});

const academicSemesterControllers = {
    createSemesterController,
    getAllSemesterController,
};

export default academicSemesterControllers;
