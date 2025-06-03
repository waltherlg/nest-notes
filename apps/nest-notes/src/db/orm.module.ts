import { DynamicModule, Module } from '@nestjs/common';
import { ORMenum } from './orm.type';
import { PrismaOrmModule } from './prisma/prisma.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './typeorm/typeorm.config';
import { currentOrm } from '../core/constants/core.constants';
import { PostgreSqlModule } from './postresql/postgresql.module';

@Module({})
export class OrmModule {
  static async register(): Promise<DynamicModule> {
    let selectedOrmModule: DynamicModule;

    switch (currentOrm) {
      case ORMenum.PRISMA:
        selectedOrmModule = PrismaOrmModule.register();
        break;
      case ORMenum.TYPEORM:
        selectedOrmModule = TypeOrmModule.forRoot(typeOrmConfig);
        break;
      case ORMenum.POSTGRESQL:
        selectedOrmModule = PostgreSqlModule.register();
        break;
      default:
        throw new Error(
          `Unsupported ORM "${currentOrm}". Available: ${Object.values(ORMenum).join(', ')}`,
        );
    }

    return {
      module: OrmModule,
      imports: [selectedOrmModule],
      exports: [selectedOrmModule],
    };
  }
}
