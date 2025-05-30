import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { PrismaUserRepository } from '../infrastructure/prisma.user.repository';
import { UserCreateInputDto } from './user-api-dto';
import { CreateUserDomainDto } from '../domain/dto/user-domain-dto';
import { IUserRepository } from '../domain/interfaces/user.repository.interface';

@Controller('sa/users')
export class UserController {
  constructor(private readonly userRepository: IUserRepository) {}

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

  @Get(':userId')
  async getUserById(@Param('userId') userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Delete(':userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUserById(@Param('userId') userId: string) {
    await this.userRepository.delete(userId);
  }
}
