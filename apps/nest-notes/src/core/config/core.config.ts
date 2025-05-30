import { Injectable } from '@nestjs/common';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { ConfigService } from '@nestjs/config';
import { configValidationUtility } from '../../setup/utils/config-validation-utility';

export enum Environments {
  DEVELOPMENT = 'development',
  TESTING = 'testing',
  PRODUCTION = 'production',
}

@Injectable()
export class CoreConfig {
  @IsNumber(
    {},
    {
      message: 'Set Env variable PORT, example: 3000',
    },
  )
  port: number = Number(this.configService.get('PORT'));

  @IsNotEmpty({
    message:
      'Set Env variable PRISMA_DATABASE_URL, example: postgresql://user:password@localhost:5432/my-data-base',
  })
  prismaDatabaseURL: string = this.configService.get<string>(
    'PRISMA_DATABASE_URL',
  );

  @IsNotEmpty({
    message:
      'Set Env variable TYPEORM_DATABASE_URL, example: postgresql://user:password@localhost:5432/my-data-base',
  })
  typeOrmDatabaseURL: string = this.configService.get<string>(
    'TYPEORM_DATABASE_URL',
  );

  @IsEnum(Environments, {
    message:
      'Set correct NODE_ENV value, available values: ' +
      configValidationUtility.getEnumValues(Environments).join(', '),
  })
  env: string = this.configService.get('NODE_ENV');

  constructor(private configService: ConfigService<any, true>) {
    configValidationUtility.validateConfig(this);
  }
}
