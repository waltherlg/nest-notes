import { UserUpdateInputDto, UserViewDto } from '../../api/user-api-dto';
import { CreateUserDomainDto } from '../dto/user-domain-dto';

export interface IUserRepository {
  findAll(): Promise<UserViewDto[]>;
  findById(id: string): Promise<UserViewDto | null>;
  create(data: CreateUserDomainDto): Promise<UserViewDto>;
  update(id: string, data: UserUpdateInputDto): Promise<boolean>;
  delete(id: string): Promise<boolean>;
}
