import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import paginationHelpers from './../../../helpers/paginationHelper';
import {
    academicSemesterSearchAbleFields,
    academicSemesterTitleCodeMapper,
} from './academicSemester.constant';
import { IAcademicSemester, IAcademicSemesterFilters } from './academicSemester.interface';
import AcademicSemesterModel from './academicSemester.model';

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
    const { searchTerm, ...filtersData } = filters;

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

    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([key, value]) => ({
                [key]: value,
            })),
        });
    }

    const whereCondition = andConditions.length ? { $and: andConditions } : {};

    const result = await AcademicSemesterModel.find(whereCondition)
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

const getSingleSemester = async (id: string): Promise<IAcademicSemester | null> => {
    const result = await AcademicSemesterModel.findById(id);
    return result;
};

const updateSemester = async (
    id: string,
    payload: Partial<IAcademicSemester>,
): Promise<IAcademicSemester | null> => {
    if (
        payload.code &&
        payload.title &&
        academicSemesterTitleCodeMapper[payload?.title] !== payload.code
    ) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester code');
    }

    const result = await AcademicSemesterModel.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });

    return result;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deleteSemester = async (id: string): Promise<IAcademicSemester | any> => {
    const result = await AcademicSemesterModel.findByIdAndDelete(id);
    return result;
};

const academicSemesterServices = {
    createSemester,
    getAllSemesters,
    getSingleSemester,
    updateSemester,
    deleteSemester,
};

export default academicSemesterServices;
