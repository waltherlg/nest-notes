import { Controller, Get } from '@nestjs/common';
import { PrismaUserRepository } from '../infrastructure/prisma.user.repository';

@Controller('users')
export class UserController {
  constructor(private readonly userRepository: PrismaUserRepository) {}

  @Get()
  async getAllUsers() {
    const users = await this.userRepository.findAll();
    return users;
  }
}
