import { UserRepository } from '../../domain/port/UserRepository';
import { User } from '../../domain/models/User';
import { Points } from '../../domain/value-objects/Points';  
import pool from '../database/mysql';                   

export class UserRepositoryMySQL implements UserRepository {
  async findById(id: string): Promise<User | null> {
    const [rows] = await pool.query(
      'SELECT id, points_balance FROM users WHERE id = ?',
      [id]
    );

    const row = (rows as any[])[0];
    if (!row) return null;

    return {
      id: row.id,
      pointsBalance: Points.create(row.points_balance), 
    };
  }

  async create(user: User): Promise<void> {
    await pool.query(
      'INSERT INTO users (id, points_balance) VALUES (?, ?)',
      [user.id, user.pointsBalance.raw]  
    );
  }

  async update(user: User): Promise<void> {
    await pool.query(
      'UPDATE users SET points_balance = ? WHERE id = ?',
      [user.pointsBalance.raw, user.id]  
    );
  }

  async findAll(): Promise<User[]> {
    const [rows] = await pool.query(
      'SELECT id, points_balance FROM users'
    );

    return (rows as any[]).map(row => ({
      id: row.id,
      pointsBalance: Points.create(row.points_balance), 
    }));
  }
}
