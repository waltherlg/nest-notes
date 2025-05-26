import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/config/core.module';
import { configModule } from './config';

@Module({
  imports: [configModule, CoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
