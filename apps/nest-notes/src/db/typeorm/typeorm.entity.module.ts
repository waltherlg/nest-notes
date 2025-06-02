import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmUser } from './entity/user.entity';
import { typeOrmEntityes } from './entity/entity.provider';

@Module({
  imports: [TypeOrmModule.forFeature([...typeOrmEntityes])],
  exports: [TypeOrmModule],
})
export class TypeOrmEntityModule {}
