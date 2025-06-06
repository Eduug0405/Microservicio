import { ItemRepository } from '../domain/port/ItemRepository';
import { Item } from '../domain/models/Item';
import { randomUUID } from 'crypto';

export class CreateItem {
  constructor(private readonly itemRepo: ItemRepository) {}

  async execute(data: {
    name: string;
    description?: string;
    price: number;
  }): Promise<Item> {
    const item: Item = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      price: data.price
    };

    await this.itemRepo.create(item);
    return item;
  }
}
