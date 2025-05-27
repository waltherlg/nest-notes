import { Module } from '@nestjs/common';
import { UserController } from './api/sa.user.controller';
import { PrismaUserRepository } from './infrastructure/prisma.user.repository';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [PrismaUserRepository],
})
export class UserModule {}
