import { Module } from '@nestjs/common';
import { NotesNotificationsController } from './notes-notifications.controller';
import { NotesNotificationsService } from './notes-notifications.service';

@Module({
  imports: [],
  controllers: [NotesNotificationsController],
  providers: [NotesNotificationsService],
})
export class NotesNotificationsModule {}
