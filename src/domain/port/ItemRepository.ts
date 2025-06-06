import { Item } from '../models/Item';

export interface ItemRepository {
  findAll(): Promise<Item[]>;
  findById(id: string): Promise<Item | null>;
  create(item: Item): Promise<void>;    
}
