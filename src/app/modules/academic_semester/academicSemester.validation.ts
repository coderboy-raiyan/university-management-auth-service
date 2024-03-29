import { z } from 'zod';
import {
    academicSemesterCodes,
    academicSemesterMonths,
    academicSemesterTitles,
} from './academicSemester.constant';

const createAcademicSemesterZodSchema = z.object({
    body: z.object({
        title: z.enum([...academicSemesterTitles] as [string, ...string[]], {
            required_error: 'Title is required',
        }),
        year: z.string({
            required_error: 'Year is required',
        }),
        code: z.enum([...academicSemesterCodes] as [string, ...string[]], {
            required_error: 'Code is required',
        }),
        startMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
            required_error: 'Start month is required',
        }),
        endMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
            required_error: 'End month is required',
        }),
    }),
});

const updateAcademicSemesterZodSchema = z
    .object({
        body: z.object({
            title: z.enum([...academicSemesterTitles] as [string, ...string[]]).optional(),
            year: z.string().optional(),
            code: z.enum([...academicSemesterCodes] as [string, ...string[]]).optional(),
            startMonth: z.enum([...academicSemesterMonths] as [string, ...string[]]).optional(),
            endMonth: z.enum([...academicSemesterMonths] as [string, ...string[]]).optional(),
        }),
    })
    .refine(data => data.body.title && data.body.code, {
        message: 'Either both title and code should be provided or neither',
    });

const academicSemesterValidations = {
    createAcademicSemesterZodSchema,
    updateAcademicSemesterZodSchema,
};

export default academicSemesterValidations;
