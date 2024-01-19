import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { academicSemesterTitleCodeMapper } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';
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
): Promise<IGenericResponse<IAcademicSemester[]>> => {
    const page = paginationOptions.page || 1;
    const limit = paginationOptions.limit || 10;
    const skip = (page - 1) * limit;

    const result = await AcademicSemesterModel.find({}).sort().skip(skip).limit(limit);
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
