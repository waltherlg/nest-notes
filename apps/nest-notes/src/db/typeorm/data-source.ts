import { DataSource } from 'typeorm';
import { TypeOrmUser } from './entity/user.entity';

export default new DataSource({
  type: 'postgres',
  url: 'postgres://postgres:postgres@localhost:5432/nest-notes-typeorm',
  synchronize: false,
  entities: [TypeOrmUser],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  migrationsTableName: 'typeorm_migration_table',
});
