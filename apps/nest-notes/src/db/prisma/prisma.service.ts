import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { CoreConfig } from '../../core/config/core.config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(coreConfig: CoreConfig) {
    super({
      datasources: {
        db: {
          url: coreConfig.prismaDatabaseURL,
        },
      },
    });
  }
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
