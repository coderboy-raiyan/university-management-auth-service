import httpStatus from 'http-status';
import mongoose from 'mongoose';
import ApiError from '../../../errors/ApiError';
import {
    academicSemesterCodes,
    academicSemesterMonths,
    academicSemesterTitles,
} from './academicSemester.constant';
import {
    IAcademicSemester,
    IAcademicSemesterMethods,
    IAcademicSemesterModel,
} from './academicSemester.interface';

const academicSemesterSchema = new mongoose.Schema<
    IAcademicSemester,
    IAcademicSemesterModel,
    IAcademicSemesterMethods
>(
    {
        title: {
            type: String,
            required: true,
            enum: academicSemesterTitles,
        },

        year: {
            type: Number,
            required: true,
        },
        code: {
            type: String,
            required: true,
            enum: academicSemesterCodes,
        },
        startMonth: {
            type: String,
            required: true,
            enum: academicSemesterMonths,
        },
        endMonth: {
            type: String,
            required: true,
            enum: academicSemesterMonths,
        },
    },
    { timestamps: true },
);

academicSemesterSchema.pre('save', async function (next) {
    const isExists = await AcademicSemesterModel.findOne({ title: this.title, year: this.year });
    if (isExists) {
        throw new ApiError(httpStatus.CONFLICT, 'Academic Semester is already exists!');
    }
    next();
});

const AcademicSemesterModel = mongoose.model<IAcademicSemester, IAcademicSemesterModel>(
    'AcademicSemester',
    academicSemesterSchema,
);

export default AcademicSemesterModel;
