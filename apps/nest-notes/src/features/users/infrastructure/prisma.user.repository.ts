import { Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository } from '../domain/interfaces/user.repository.interface';
import { CreateUserDomainDto } from '../domain/dto/user-domain-dto';
import { UserUpdateInputDto, UserViewDto } from '../api/user-api-dto';
import { PrismaService } from '../../../db/prisma/prisma.service';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<UserViewDto[]> {
    const users = await this.prisma.prismaUser.findMany({});
    return users;
  }

  async findById(id: string): Promise<UserViewDto | null> {
    const user = await this.prisma.prismaUser.findUnique({ where: { id } });
    console.log('prisma find by id');
    return user ? user : null;
  }

  async create(dto: CreateUserDomainDto): Promise<UserViewDto> {
    const createdUser = await this.prisma.prismaUser.create({
      data: { ...dto },
    });
    return createdUser;
  }

  async update(id: string, data: UserUpdateInputDto): Promise<boolean> {
    const updatedUser = await this.prisma.prismaUser.update({
      where: { id },
      data: { ...data },
    });
    return !!updatedUser;
  }

  async delete(id: string): Promise<boolean> {
    try {
      const result = await this.prisma.prismaUser.delete({ where: { id } });
      return !!result;
    } catch (error) {
      return false;
    }
  }
}
