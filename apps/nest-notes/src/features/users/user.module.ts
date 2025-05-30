import { DynamicModule, Module } from '@nestjs/common';
import { UserController } from './api/sa.user.controller';
import { PrismaUserRepository } from './infrastructure/prisma.user.repository';
import { PrismaOrmModule } from '../../db/prisma/prisma.module';
import { ORMenum } from '../../db/orm.type';
import { TypeOrmUserRepository } from './infrastructure/typeorm.user.repository';
import { IUserRepository } from './domain/interfaces/user.repository.interface';
import { TypeOrmEntityModule } from '../../db/typeorm/typeorm.entity.module';

@Module({})
export class UserModule {
  static register(currentOrm: ORMenum): DynamicModule {
    let userRepoProvider;
    let ormImports = [];

    switch (currentOrm) {
      case ORMenum.PRISMA:
        userRepoProvider = {
          provide: IUserRepository,
          useClass: PrismaUserRepository,
        };
        ormImports = [PrismaOrmModule];
        break;

      case ORMenum.TYPEORM:
        userRepoProvider = {
          provide: IUserRepository,
          useClass: TypeOrmUserRepository,
        };
        ormImports = [TypeOrmEntityModule]; // содержит TypeOrmModule.forFeature([...])
        break;

      default:
        throw new Error(`Unsupported ORM: ${currentOrm}`);
    }

    return {
      module: UserModule,
      controllers: [UserController],
      providers: [userRepoProvider],
      exports: [userRepoProvider],
      imports: ormImports,
    };
  }
}
