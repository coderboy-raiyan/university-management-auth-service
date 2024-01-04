import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
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

const academicSemesterServices = {
    createSemester,
};

export default academicSemesterServices;
