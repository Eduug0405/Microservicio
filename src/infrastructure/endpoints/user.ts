import { Router } from 'express';
import { makeCreateUser } from '../controllers/UserController';
import { dependencies } from '../Dependencies';

export const usersRouter = Router();

usersRouter.post('/', makeCreateUser(dependencies.createUser));
