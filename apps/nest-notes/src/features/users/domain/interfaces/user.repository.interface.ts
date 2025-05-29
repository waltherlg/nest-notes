import { UserUpdateInputDto, UserViewDto } from '../../api/user-api-dto';
import { CreateUserDomainDto } from '../dto/user-domain-dto';

export abstract class IUserRepository {
  abstract findAll(): Promise<UserViewDto[]>;
  abstract findById(id: string): Promise<UserViewDto | null>;
  abstract create(data: CreateUserDomainDto): Promise<UserViewDto>;
  abstract update(id: string, data: UserUpdateInputDto): Promise<boolean>;
  abstract delete(id: string): Promise<boolean>;
}
