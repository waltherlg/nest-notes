import { DynamicModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreConfigModule } from './core/config/core.module';
import { configModule } from './config';
import { UserModule } from './features/users/user.module';
import { OrmModule } from './db/orm.module';

@Module({})
export class AppModule {
  static async register(): Promise<DynamicModule> {
    return {
      module: AppModule,
      imports: [
        configModule,
        CoreConfigModule,
        await OrmModule.register(),
        UserModule.register(),
      ],
      controllers: [AppController],
      providers: [AppService],
    };
  }
}
