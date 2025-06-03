import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../domain/interfaces/user.repository.interface';
import { UserViewDto, UserUpdateInputDto } from '../api/user-api-dto';
import { CreateUserDomainDto } from '../domain/dto/user-domain-dto';
import { PostgreSqlService } from '../../../db/postresql/postgresql.service';

@Injectable()
export class PostgreSqlUserRepository implements IUserRepository {
  constructor(private readonly sql: PostgreSqlService) {}
  findAll(): Promise<UserViewDto[]> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<UserViewDto | null> {
    throw new Error('Method not implemented.');
  }
  create(data: CreateUserDomainDto): Promise<UserViewDto> {
    throw new Error('Method not implemented.');
  }
  update(id: string, data: UserUpdateInputDto): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
