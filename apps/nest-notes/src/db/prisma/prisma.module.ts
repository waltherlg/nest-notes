import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaUserRepository } from '../../features/users/infrastructure/prisma.user.repository';

@Global()
@Module({
  providers: [PrismaService, PrismaUserRepository],
  exports: [PrismaService, PrismaUserRepository],
})
export class PrismaOrmModule {}
