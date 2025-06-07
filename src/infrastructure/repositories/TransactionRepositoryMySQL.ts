import { TransactionRepository } from '../../domain/port/TransactionRepository';
import { Transaction } from '../../domain/models/Transaction';
import pool from '../database/mysql';

export class TransactionRepositoryMySQL implements TransactionRepository {
  async save(transaction: Transaction): Promise<void> {
    await pool.query(
      `INSERT INTO transactions (id, user_id, item_id, amount, type, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        transaction.id,
        transaction.userId,
        transaction.itemId || null,
        transaction.amount.raw, 
        transaction.type,
        transaction.createdAt
      ]
    );
  }
}
