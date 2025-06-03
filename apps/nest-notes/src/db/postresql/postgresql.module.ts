import { Module, Global, DynamicModule } from '@nestjs/common';
import { PostgreSqlService } from './postgresql.service';
import { PostgreSqlUserRepository } from '../../features/users/infrastructure/postgreSql.user.repository';

Global();
@Module({})
export class PostgreSqlModule {
  static register(): DynamicModule {
    return {
      module: PostgreSqlModule,
      providers: [PostgreSqlService, PostgreSqlUserRepository],
      exports: [PostgreSqlService, PostgreSqlUserRepository],
    };
  }
}
