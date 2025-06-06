import { UserRepository } from '../domain/port/UserRepository';

export class GetBalance {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(userId: string): Promise<{ userId: string; pointsBalance: number }> {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new Error('Usuario no encontrado');
    return { userId: user.id, pointsBalance: user.pointsBalance };
  }
}
