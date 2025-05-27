import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../domain/interfaces/user.repository.interface';
import { CreateUserDomainDto } from '../domain/dto/user-domain-dto';
import { UserUpdateInputDto, UserViewDto } from '../api/user-api-dto';
import { PrismaService } from '../../../db/prisma/prisma.service';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<UserViewDto | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user ? user : null;
  }

  async create(dto: CreateUserDomainDto): Promise<UserViewDto> {
    const createdUser = await this.prisma.user.create({
      data: { ...dto },
    });
    return createdUser;
  }

  async update(id: string, data: UserUpdateInputDto): Promise<UserViewDto> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { ...data },
    });
    return updatedUser;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
