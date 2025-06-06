import { Router } from 'express';
import {makeGetItems,makeCreateItem}
from '../controllers/itemController';
import { dependencies } from '../../dependencies'; 


export const itemsRouter = Router();

itemsRouter.get('/', makeGetItems(dependencies.listItems));
itemsRouter.post('/', makeCreateItem(dependencies.createItem));  // 👈 ruta POST
