import { Model } from 'mongoose';

export type IAcademicSemesterMonths =
    | 'January'
    | 'February'
    | 'March'
    | 'April'
    | 'May'
    | 'June'
    | 'July'
    | 'August'
    | 'September'
    | 'October'
    | 'November'
    | 'December';

export type IAcademicSemesterTitles = 'Autumn' | 'Summer' | 'Fall';

export type IAcademicSemesterCodes = '01' | '02' | '03';

export interface IAcademicSemester {
    title: IAcademicSemesterTitles;
    year: string;
    code: IAcademicSemesterCodes;
    startMonth: IAcademicSemesterMonths;
    endMonth: IAcademicSemesterMonths;
}

export interface IAcademicSemesterMethods {
    // put class methods here
}

export interface IAcademicSemesterModel
    extends Model<IAcademicSemester, object, IAcademicSemesterMethods> {
    // put static methods here
}

export type IAcademicSemesterFilters = {
    searchTerm: string;
};
