import { Router } from 'express';
import { makeCreateUser } from '../controllers/UserController';
import { dependencies } from '../../dependencies';

export const usersRouter = Router();

usersRouter.post('/', makeCreateUser(dependencies.createUser));
