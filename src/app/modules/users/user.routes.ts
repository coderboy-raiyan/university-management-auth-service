import { Router } from 'express';
import userControllers from './user.controllers';

const userRoutes = Router();

userRoutes.post('/create-user', userControllers.createUserController);

export default userRoutes;
