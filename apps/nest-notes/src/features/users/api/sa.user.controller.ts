import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaUserRepository } from '../infrastructure/prisma.user.repository';
import { UserCreateInputDto } from './user-api-dto';
import { CreateUserDomainDto } from '../domain/dto/user-domain-dto';

@Controller('sa/users')
export class UserController {
  constructor(private readonly userRepository: PrismaUserRepository) {}

  @Post()
  async createUser(@Body() dto: UserCreateInputDto) {
    const domainDto = new CreateUserDomainDto(dto.userName, dto.email);
    const user = await this.userRepository.create(domainDto);
    return user;
  }

  @Get()
  async getAllUsers() {
    const users = await this.userRepository.findAll();
    return users;
  }
}
