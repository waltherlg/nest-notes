import { DynamicModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreConfigModule } from './core/config/core.module';
import { configModule } from './config';
import { UserModule } from './features/users/user.module';
import { ConfigService } from '@nestjs/config';
import { OrmSelectorService } from './core/config/orm.selector.service';
import { ORMenum } from './db/orm.type';
import { PrismaOrmModule } from './db/prisma/prisma.module';
import typeOrmConfig from './db/typeorm/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({})
export class AppModule {
  static async register(): Promise<DynamicModule> {
    const configService = new ConfigService();
    const ormSelector = new OrmSelectorService(configService);

    let ormModule;
    switch (ormSelector.currentOrm) {
      case ORMenum.PRISMA:
        ormModule = PrismaOrmModule;
        break;
      case ORMenum.TYPEORM:
        ormModule = TypeOrmModule.forRoot(typeOrmConfig);
        break;
      default:
        throw new Error(
          `Unsupported ORM "${ormSelector.currentOrm}". Available: ${Object.values(ORMenum).join(', ')}`,
        );
    }

    return {
      module: AppModule,
      imports: [
        configModule,
        CoreConfigModule,
        ormModule,
        UserModule.register(ormSelector.currentOrm),
      ],
      controllers: [AppController],
      providers: [AppService],
    };
  }
}
