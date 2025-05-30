import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmUser } from './entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmUser])],
  exports: [TypeOrmModule],
})
export class TypeOrmEntityModule {}
