import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { PaginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicSemesterFilterAbleFields } from './academicSemester.constant';
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
    const filters = pick(req.query, academicSemesterFilterAbleFields);

    const result = await academicSemesterServices.getAllSemesters(paginationOptions, filters);
    sendResponse<IAcademicSemester[]>(res, {
        success: true,
        message: 'Academic semesters retrieved successfully',
        statusCode: httpStatus.OK,
        ...result,
    });
});

const getSingleSemesterController = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await academicSemesterServices.getSingleSemester(id);
    sendResponse<IAcademicSemester>(res, {
        success: true,
        message: 'Academic semester retrieved successfully',
        statusCode: httpStatus.OK,
        data: result,
    });
});

const updateSemesterController = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;

    const result = await academicSemesterServices.updateSemester(id, updateData);
    sendResponse<IAcademicSemester>(res, {
        success: true,
        message: 'Academic semesters updated successfully',
        statusCode: httpStatus.OK,
        data: result,
    });
});

const deleteSemesterController = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await academicSemesterServices.deleteSemester(id);
    sendResponse<IAcademicSemester>(res, {
        success: true,
        message: 'Academic semester has been deleted successfully',
        statusCode: httpStatus.OK,
        data: result,
    });
});

const academicSemesterControllers = {
    createSemesterController,
    getAllSemesterController,
    getSingleSemesterController,
    updateSemesterController,
    deleteSemesterController,
};

export default academicSemesterControllers;
