При работе с typeOrm нам так же как и с призмой, нужно сделать настройки typeOrmConfig и DataSourse:

---

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const typeOrmConfig: TypeOrmModuleOptions = {
type: 'postgres',
url: 'postgres://postgres:postgres@localhost:5432/nest-notes-typeorm',
autoLoadEntities: true,
synchronize: false,
};

## export default typeOrmConfig;

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

---

это команда для миграции
npx typeorm migration:generate apps/nest-notes/src/db/typeorm/migrations/init -d apps/nest-notes/src/db/typeorm/data-source.ts

npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run -d apps/nest-notes/src/db/typeorm/data-source.ts
