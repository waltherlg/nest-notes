import { TypeOrmModule as NestTypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './typeorm.config';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [NestTypeOrmModule.forRoot(typeOrmConfig)],
})
export class TypeOrmModule {}
