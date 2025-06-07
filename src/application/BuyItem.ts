import { UserRepository } from '../domain/port/UserRepository';
import { ItemRepository } from '../domain/port/ItemRepository';
import { TransactionRepository } from '../domain/port/TransactionRepository';
import { Transaction } from '../domain/models/Transaction';
import { Points } from '../domain/value-objects/Points'; // 👈 Importamos Points
import { randomUUID } from 'crypto';

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

    const itemCost = Points.create(item.price); 
    if (user.pointsBalance.raw < itemCost.raw) {
      throw new Error('Saldo insuficiente');
    }


    user.pointsBalance = user.pointsBalance.subtract(itemCost);

    // Calcular bonus 10%
    const bonus = Points.create(Math.floor(item.price * 0.10)); 
    user.pointsBalance = user.pointsBalance.add(bonus);

  const purchaseTx: Transaction = {
  id: randomUUID(),
  userId,
  itemId,
  amount: Points.create(-item.price, true), // 👈 PASAMOS true para permitir negativos
  type: 'PURCHASE',
  createdAt: new Date()
};


    const bonusTx: Transaction = {
      id: randomUUID(),
      userId,
      amount: bonus,
      type: 'BONUS',
      createdAt: new Date()
    };

    await this.transactionRepo.save(purchaseTx);
    await this.transactionRepo.save(bonusTx);
    await this.userRepo.update(user);
  }
}
