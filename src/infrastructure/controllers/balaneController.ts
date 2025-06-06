import { Request, Response, RequestHandler } from 'express';
import { ListBalances } from '../../application/ListBalances';

export const makeGetAllBalances =
  (listBalances: ListBalances): RequestHandler =>
  async (_req: Request, res: Response) => {
    try {
      const balances = await listBalances.execute();
      res.json(balances);          
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'No se pudo obtener saldos' });
    }
  };