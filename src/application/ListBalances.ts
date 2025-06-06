import { UserRepository } from '../domain/port/UserRepository';

export class ListBalances {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(): Promise<{ userId: string; pointsBalance: number }[]> {
    const users = await this.userRepo.findAll();
    return users.map(u => ({ userId: u.id, pointsBalance: u.pointsBalance }));
  }
}
