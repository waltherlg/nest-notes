import { Module, Global, DynamicModule } from '@nestjs/common';
import { RawSqlService } from './postgresql.service';

Global();
@Module({})
export class PostgreSqlModule {
  static register(): DynamicModule {
    return {
      module: PostgreSqlModule,
      providers: [RawSqlService],
      exports: [RawSqlService],
    };
  }
}
