это команда для миграции
npx typeorm migration:generate apps/nest-notes/src/db/typeorm/migrations/init -d apps/nest-notes/src/db/typeorm/data-source.ts

npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run -d apps/nest-notes/src/db/typeorm/data-source.ts
