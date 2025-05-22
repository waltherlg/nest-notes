import { Controller, Get } from '@nestjs/common';
import { NotesNotificationsService } from './notes-notifications.service';

@Controller()
export class NotesNotificationsController {
  constructor(private readonly notesNotificationsService: NotesNotificationsService) {}

  @Get()
  getHello(): string {
    return this.notesNotificationsService.getHello();
  }
}
