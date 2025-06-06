import { ItemRepository } from '../../domain/port/ItemRepository';
import { Item } from '../../domain/models/Item';
import pool from '../../database/mysql';

export class ItemRepositoryMySQL implements ItemRepository {
  async findAll(): Promise<Item[]> {
    const [rows] = await pool.query('SELECT * FROM items');
    return rows as Item[];
  }

  async findById(id: string): Promise<Item | null> {
    const [rows] = await pool.query('SELECT * FROM items WHERE id = ?', [id]);
    const item = (rows as Item[])[0];
    return item || null;
  }

   async create(item: Item): Promise<void> {
    await pool.query(
      'INSERT INTO items (id, name, description, price) VALUES (?, ?, ?, ?)',
      [item.id, item.name, item.description ?? null, item.price]
    );
}
}
