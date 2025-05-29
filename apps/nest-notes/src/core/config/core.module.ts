import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CoreConfig } from './core.config';
import { PrismaService } from '../../db/prisma/prisma.service';

@Global()
@Module({
  imports: [CqrsModule.forRoot()],
  providers: [CoreConfig, PrismaService],
  exports: [PrismaService, CqrsModule, CoreConfig],
})
export class CoreConfigModule {}
