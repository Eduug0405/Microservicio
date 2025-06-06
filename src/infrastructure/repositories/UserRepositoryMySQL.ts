import { UserRepository } from '../../domain/port/UserRepository';
import { User } from '../../domain/models/User';
import pool from '../../database/mysql';

export class UserRepositoryMySQL implements UserRepository {
  async findById(id: string): Promise<User | null> {
    const [rows] = await pool.query(
      'SELECT id, points_balance AS pointsBalance FROM users WHERE id = ?',
      [id]
    );
    return (rows as User[])[0] || null;
  }

  async create(user: User): Promise<void> {
    await pool.query(
      'INSERT INTO users (id, points_balance) VALUES (?, ?)',
      [user.id, user.pointsBalance]
    );
  }

  async update(user: User): Promise<void> {
    await pool.query(
      'UPDATE users SET points_balance = ? WHERE id = ?',
      [user.pointsBalance, user.id]
    );
  }

    async findAll(): Promise<User[]> {
    const [rows] = await pool.query(
      'SELECT id, points_balance AS pointsBalance FROM users'
    );
    return rows as User[];
  }
}
