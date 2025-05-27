import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/config/core.module';
import { configModule } from './config';
import { UserModule } from './features/users/user.module';

@Module({
  imports: [configModule, CoreModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
