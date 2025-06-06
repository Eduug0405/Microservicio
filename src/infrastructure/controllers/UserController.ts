import { Request, Response } from 'express';
import { CreateUser } from '../../application/CreateUser';

export const makeCreateUser =
  (createUser: CreateUser) => async (req: Request, res: Response) => {
    try {
      const { userId, initialPoints } = req.body as {
        userId?: string;
        initialPoints?: number;
      };
      const user = await createUser.execute(initialPoints ?? 0, userId);
      res.status(201).json(user);
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ message: 'No se pudo crear el usuario' });
    }
  };
