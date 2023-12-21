import { Model } from 'mongoose';

export interface IAcademicSemester {
    title: string;
    year: number;
    code: string;
    startMonth: string;
    endMonth: string;
}

export interface IAcademicSemesterMethods {
    // put class methods here
}

export interface IAcademicSemesterModel
    extends Model<IAcademicSemester, object, IAcademicSemesterMethods> {
    // put static methods here
}
