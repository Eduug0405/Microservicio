import { Router } from 'express';
import { makeGetAllBalances } from '../controllers/balaneController';
import { dependencies } from '../Dependencies';

export const balanceRouter = Router();

balanceRouter.get('/', makeGetAllBalances(dependencies.listBalances));
