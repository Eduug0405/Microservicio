import { UserRepository } from '../domain/port/UserRepository';
import { User } from '../domain/models/User';
import { Points } from '../domain/value-objects/Points'; 
import { randomUUID } from 'crypto';

export class CreateUser {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(initialPoints = 0, providedId?: string): Promise<User> {
    const user: User = {
      id: providedId ?? randomUUID(),
      pointsBalance: Points.create(initialPoints)  
    };
    await this.userRepo.create(user);
    return user;
  }
}
