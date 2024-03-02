import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import paginationHelpers from './../../../helpers/paginationHelper';
import { academicSemesterTitleCodeMapper } from './academicSemester.constant';
import { IAcademicSemester, IAcademicSemesterFilters } from './academicSemester.interface';
import AcademicSemesterModel from './academicSemester.mode';

const createSemester = async (payload: IAcademicSemester): Promise<IAcademicSemester> => {
    if (academicSemesterTitleCodeMapper[payload?.title] !== payload.code) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester code');
    }

    const result = await AcademicSemesterModel.create(payload);
    return result;
};

const getAllSemesters = async (
    paginationOptions: IPaginationOptions,
    filters: IAcademicSemesterFilters,
): Promise<IGenericResponse<IAcademicSemester[]>> => {
    const { page, limit, skip, sortBy, sortOrder } =
        paginationHelpers.calculatePagination(paginationOptions);

    const sortOptions: { [key: string]: SortOrder } = {};

    if (sortBy && sortOrder) {
        sortOptions[sortBy] = sortOrder;
    }
    const { searchTerm } = filters;
    const academicSemesterSearchAbleFields = ['title', 'code', 'year'];
    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            $or: academicSemesterSearchAbleFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }

    const result = await AcademicSemesterModel.find({ $and: andConditions })
        .sort(sortOptions)
        .skip(skip)
        .limit(limit);
    const total = await AcademicSemesterModel.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};

const academicSemesterServices = {
    createSemester,
    getAllSemesters,
};

export default academicSemesterServices;
