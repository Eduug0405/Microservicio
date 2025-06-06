import { ItemRepository } from ".././domain/port/ItemRepository";

export class ListItems {
  constructor(private readonly itemRepo: ItemRepository) {}

  execute() {
    return this.itemRepo.findAll();
  }
}
