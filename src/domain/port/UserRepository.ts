import { User } from '../models/User';

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  create(user: User): Promise<void>;  
 findAll(): Promise<User[]>;       
 update(user: User): Promise<void>;
}
