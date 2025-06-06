import { Router } from 'express';
import { makeGetAllBalances } from '../controllers/balaneController';
import { dependencies } from '../../dependencies';

export const balanceRouter = Router();

balanceRouter.get('/', makeGetAllBalances(dependencies.listBalances));
