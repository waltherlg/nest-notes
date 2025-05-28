import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: 'postgres://postgres:postgres@localhost:5432/nest-notes-typeorm',
  autoLoadEntities: true,
  synchronize: false,
};

export default typeOrmConfig;
