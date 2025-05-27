import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../domain/interfaces/user.repository.interface';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  findById(id: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  create(data: CreateUserDto): Promise<User> {
    throw new Error('Method not implemented.');
  }
  update(id: string, data: UpdateUserDto): Promise<User> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
