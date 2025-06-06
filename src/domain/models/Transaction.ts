export type TransactionType = 'PURCHASE' | 'BONUS';

export interface Transaction {
  id: string;
  userId: string;
  itemId?: string; 
  amount: number;
  type: TransactionType;
  createdAt: Date;
}

