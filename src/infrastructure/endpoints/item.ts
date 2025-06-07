import { Router } from 'express';
import {makeGetItems,makeCreateItem}
from '../controllers/itemController';
import { dependencies } from '../Dependencies'; 


export const itemsRouter = Router();

itemsRouter.get('/', makeGetItems(dependencies.listItems));
itemsRouter.post('/', makeCreateItem(dependencies.createItem));  
