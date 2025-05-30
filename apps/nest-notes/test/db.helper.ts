import { PrismaClient } from '@prisma/client';
import { CoreConfig } from '../src/core/config/core.config';
import { PrismaService } from '../src/db/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { DataSource } from 'typeorm';

export const prisma = new PrismaClient();

export async function cleanDb(app: INestApplication): Promise<void> {
  const orm = process.env.NODE_ENV_DB;

  if (orm === 'prisma') {
    const prisma = app.get(PrismaService);
    await prisma.$transaction([prisma.prismaUser.deleteMany()]);
  } else if (orm === 'typeorm') {
    const dataSource = app.get(DataSource);
    const entities = dataSource.entityMetadatas;

    for (const entity of entities) {
      const repository = dataSource.getRepository(entity.name);
      await repository.clear(); // delete({})
    }
  }
}
