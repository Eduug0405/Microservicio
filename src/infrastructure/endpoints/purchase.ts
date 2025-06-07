import { Router } from 'express';
import { makePurchase } from '../controllers/PurchaseController';
import { dependencies } from '../Dependencies';

export const purchaseRouter = Router();

purchaseRouter.post('/', makePurchase(dependencies.buyItem));
