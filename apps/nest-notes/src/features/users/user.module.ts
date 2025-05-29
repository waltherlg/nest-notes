import { DynamicModule, Module } from '@nestjs/common';
import { UserController } from './api/sa.user.controller';
import { PrismaUserRepository } from './infrastructure/prisma.user.repository';
import { PrismaOrmModule } from '../../db/prisma/prisma.module';
import { ORMenum } from '../../db/orm.type';
import { TypeOrmUserRepository } from './infrastructure/typeorm.user.repository';
import { IUserRepository } from './domain/interfaces/user.repository.interface';

@Module({})
export class UserModule {
  static register(currentOrm: ORMenum): DynamicModule {
    let repoProvider;

    switch (currentOrm) {
      case ORMenum.prisma:
        repoProvider = {
          provide: IUserRepository,
          useClass: PrismaUserRepository,
        };
        break;
      case ORMenum.typeorm:
        repoProvider = {
          provide: IUserRepository,
          useClass: TypeOrmUserRepository,
        };
        break;
      default:
        throw new Error(`Unsupported ORM: ${currentOrm}`);
    }

    return {
      module: UserModule,
      controllers: [UserController],
      providers: [repoProvider],
      exports: [repoProvider],
    };
  }
}
