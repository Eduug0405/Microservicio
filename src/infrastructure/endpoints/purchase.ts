import { Router } from 'express';
import { makePurchase } from '../controllers/PurchaseController';
import { dependencies } from '../../dependencies';

export const purchaseRouter = Router();

purchaseRouter.post('/', makePurchase(dependencies.buyItem));
