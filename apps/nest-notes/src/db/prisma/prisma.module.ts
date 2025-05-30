import { DynamicModule, Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaUserRepository } from '../../features/users/infrastructure/prisma.user.repository';

@Global()
@Module({})
export class PrismaOrmModule {
  static register(): DynamicModule {
    return {
      module: PrismaOrmModule,
      providers: [PrismaService, PrismaUserRepository],
      exports: [PrismaService, PrismaUserRepository],
    };
  }
}
