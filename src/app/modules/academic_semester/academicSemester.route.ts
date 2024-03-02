import { Router } from 'express';

import validateRequest from '../../middlewares/validateRequest';
import academicSemesterControllers from './academicSemester.controller';
import academicSemesterValidations from './academicSemester.validation';

const academicSemesterRoutes = Router();

academicSemesterRoutes.get('/', academicSemesterControllers.getAllSemesterController);
academicSemesterRoutes.get('/:id', academicSemesterControllers.getSingleSemesterController);
academicSemesterRoutes.patch(
    '/:id',
    validateRequest(academicSemesterValidations.updateAcademicSemesterZodSchema),
    academicSemesterControllers.updateSemesterController,
);

academicSemesterRoutes.post(
    '/create-semester',
    validateRequest(academicSemesterValidations.createAcademicSemesterZodSchema),
    academicSemesterControllers.createSemesterController,
);

export default academicSemesterRoutes;
