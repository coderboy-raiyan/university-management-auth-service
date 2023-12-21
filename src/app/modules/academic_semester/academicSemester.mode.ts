import mongoose from 'mongoose';
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
        },

        year: {
            type: Number,
            required: true,
        },
        code: {
            type: String,
            required: true,
        },
        startMonth: {
            type: String,
            required: true,
        },
        endMonth: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

const AcademicSemesterModel = mongoose.model<IAcademicSemester, IAcademicSemesterModel>(
    'AcademicSemester',
    academicSemesterSchema,
);

export default AcademicSemesterModel;
