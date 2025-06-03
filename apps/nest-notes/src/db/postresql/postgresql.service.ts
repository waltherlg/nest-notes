import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Pool } from 'pg';
import { CoreConfig } from '../../core/config/core.config';

@Injectable()
export class PostgreSqlService implements OnModuleDestroy {
  private pool: Pool;

  constructor(coreConfig: CoreConfig) {
    this.pool = new Pool({
      connectionString: coreConfig.postgresqlDatabaseURL,
    });
  }

  async query<T = any>(text: string, params?: any[]): Promise<T[]> {
    const res = await this.pool.query<T>(text, params);
    return res.rows;
  }

  async onModuleDestroy() {
    await this.pool.end();
  }
}
