import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ORMenum } from '../../db/orm.type';

@Injectable()
export class OrmSelectorService {
  private readonly logger = new Logger(OrmSelectorService.name);
  readonly currentOrm: ORMenum;

  constructor(private readonly configService: ConfigService) {
    const rawValue = this.configService.get<string>('NODE_ENV_DB', {
      infer: true, // безопаснее при запуске без .env
    });

    if (!rawValue) {
      throw new Error(
        `NODE_ENV_DB is not set. Pass it using cross-env, e.g. "cross-env NODE_ENV_DB=prisma nest start"`,
      );
    }

    const normalized = rawValue.toLowerCase() as ORMenum;

    if (!Object.values(ORMenum).includes(normalized)) {
      throw new Error(
        `Unsupported ORM "${rawValue}". Supported values: ${Object.values(ORMenum).join(', ')}`,
      );
    }

    this.logger.log(`Active ORM: ${normalized}`);
    this.currentOrm = normalized;
  }
}
