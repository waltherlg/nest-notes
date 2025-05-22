import { NestFactory } from '@nestjs/core';
import { NotesNotificationsModule } from './notes-notifications.module';

async function bootstrap() {
  const app = await NestFactory.create(NotesNotificationsModule);
  await app.listen(3000);
}
bootstrap();
