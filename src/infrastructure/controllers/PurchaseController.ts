import { Request, Response } from 'express';
import { BuyItem } from '../../application/BuyItem';

export const makePurchase = (buyItem: BuyItem) => async (req: Request, res: Response) => {
  try {
    const { userId, itemId } = req.body;
    await buyItem.execute(userId, itemId);
    res.status(200).json({ message: 'Compra realizada exitosamente' });
  } catch (err: any) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};
