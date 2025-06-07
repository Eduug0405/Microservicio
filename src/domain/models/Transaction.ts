import { Points } from '../value-objects/Points'; 

export type TransactionType = 'PURCHASE' | 'BONUS'; 

export interface Transaction {
  id: string;
  userId: string;
  itemId?: string;
  amount: Points; 
  type: TransactionType;
  createdAt: Date;
}
