import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ORMenum } from '../../db/orm.type';

@Injectable()
export class OrmSelectorService {
  constructor(private configService: ConfigService) {}

  get orm(): ORMenum {
    const raw = process.env.NODE_ENV_DB?.toLowerCase();

    if (!raw || !Object.values(ORMenum).includes(raw as ORMenum)) {
      throw new Error(
        `Invalid or missing NODE_ENV_DB value. Expected one of: ${Object.values(ORMenum).join(', ')}`,
      );
    }

    return raw as ORMenum;
  }
}
