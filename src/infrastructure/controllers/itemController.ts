import { Request, Response } from 'express';
import { ListItems } from '../../application/ListItems';
import { CreateItem } from '../../application/CreateItem';

export const makeGetItems =
  (listItems: ListItems) => async (_req: Request, res: Response): Promise<void> => {
    try {
      const items = await listItems.execute();
      res.json(items);          
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error al obtener artículos' });
    }
  };

export const makeCreateItem =
  (createItem: CreateItem) => async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, description, price } = req.body as {
        name: string;
        description?: string;
        price: number;
      };

      if (!name || price == null) {
        res.status(400).json({ message: 'Los campos name y price son obligatorios' });
        return;
      }

      const item = await createItem.execute({ name, description, price });
      res.status(201).json(item);  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'No se pudo crear el artículo' });
    }
  };
