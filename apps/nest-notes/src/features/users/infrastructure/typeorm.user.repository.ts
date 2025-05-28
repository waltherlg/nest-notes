import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../domain/interfaces/user.repository.interface';
import { UserViewDto, UserUpdateInputDto } from '../api/user-api-dto';
import { CreateUserDomainDto } from '../domain/dto/user-domain-dto';
import { Repository } from 'typeorm';
import { TypeOrmUser } from '../../../db/typeorm/entity/user.entity';

@Injectable()
export class TypeOrmUserRepository implements IUserRepository {
  constructor(private readonly userRepository: Repository<TypeOrmUser>) {}

  async findAll(): Promise<UserViewDto[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async findById(id: string): Promise<UserViewDto | null> {
    const user: TypeOrmUser = await this.userRepository.findOne({
      where: [{ id }],
    });
    return user ? user : null;
  }

  async create(data: CreateUserDomainDto): Promise<UserViewDto> {
    const result = await this.userRepository.save(data);
    return result;
  }

  async update(id: string, data: UserUpdateInputDto): Promise<boolean> {
    const result = await this.userRepository.update({ id }, { ...data });
    return result.affected > 0;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    return result.affected > 0;
  }
}
