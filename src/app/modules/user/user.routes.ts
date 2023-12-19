import { Router } from 'express';

import validateRequest from '../../middlewares/validateRequest';
import userControllers from './user.controllers';
import userValidations from './user.validation';

const userRoutes = Router();

userRoutes.post(
    '/create-user',
    validateRequest(userValidations.createUserZodSchema),
    userControllers.createUserController,
);

export default userRoutes;
