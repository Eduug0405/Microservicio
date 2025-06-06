import { Transaction } from '../models/Transaction';

export interface TransactionRepository {
  save(transaction: Transaction): Promise<void>;
}
