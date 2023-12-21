import { Router } from 'express';

import validateRequest from '../../middlewares/validateRequest';
import academicSemesterValidations from './academicSemester.validation';

const academicSemesterRoute = Router();

academicSemesterRoute.post(
    '/create-user',
    validateRequest(academicSemesterValidations.createAcademicSemesterZodSchema),
);

export default academicSemesterRoute;
