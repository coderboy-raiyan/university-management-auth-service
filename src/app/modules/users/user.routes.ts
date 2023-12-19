import { Router } from 'express';
import userControllers from './user.controllers';

const userRouter = Router();

userRouter.post('/create-user', userControllers.createUserController);

export default userRouter;
