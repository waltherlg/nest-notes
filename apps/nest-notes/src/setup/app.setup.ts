import { INestApplication } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

export function appSetup(app: INestApplication) {
  app.enableCors({ origin: true, credentials: true });
  app.use(cookieParser());
}
