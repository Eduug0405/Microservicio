import { UserRepository } from '../domain/port/UserRepository';
import { ItemRepository } from '../domain/port/ItemRepository';
import { TransactionRepository } from '../domain/port/TransactionRepository';
import { randomUUID } from 'crypto';
import { Transaction } from '../domain/models/Transaction';

export class BuyItem {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly itemRepo: ItemRepository,
    private readonly transactionRepo: TransactionRepository
  ) {}

  async execute(userId: string, itemId: string): Promise<void> {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new Error('Usuario no encontrado');

    const item = await this.itemRepo.findById(itemId);
    if (!item) throw new Error('Artículo no encontrado');

    if (user.pointsBalance < item.price) throw new Error('Saldo insuficiente');

    const purchaseTx: Transaction = {
      id: randomUUID(),
      userId,
      itemId,
      amount: -item.price,
      type: 'PURCHASE',
      createdAt: new Date()
    };

    // Calcular bonus 10%
    const bonus = Math.floor(item.price * 0.10);

    const bonusTx: Transaction = {
      id: randomUUID(),
      userId,
      amount: bonus,
      type: 'BONUS',
      createdAt: new Date()
    };
    user.pointsBalance = user.pointsBalance - item.price + bonus;

    await this.transactionRepo.save(purchaseTx);
    await this.transactionRepo.save(bonusTx);
    await this.userRepo.update(user);
  }
}
