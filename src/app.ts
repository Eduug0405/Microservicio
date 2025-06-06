import express from 'express';
import dotenv from 'dotenv';
import { itemsRouter } from './infrastructure/endpoints/item'; 
import { purchaseRouter } from './infrastructure/endpoints/purchase';
import { usersRouter } from './infrastructure/endpoints/user';
import { balanceRouter } from './infrastructure/endpoints/balance';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/items', itemsRouter); 
app.use('/purchase', purchaseRouter); 
app.use('/users', usersRouter);
app.use('/balance', balanceRouter);  
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
