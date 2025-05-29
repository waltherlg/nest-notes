import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './typeorm.config';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig)],
})
export class TypeOrmModule {}
