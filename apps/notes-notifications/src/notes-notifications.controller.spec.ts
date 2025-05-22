import { Test, TestingModule } from '@nestjs/testing';
import { NotesNotificationsController } from './notes-notifications.controller';
import { NotesNotificationsService } from './notes-notifications.service';

describe('NotesNotificationsController', () => {
  let notesNotificationsController: NotesNotificationsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NotesNotificationsController],
      providers: [NotesNotificationsService],
    }).compile();

    notesNotificationsController = app.get<NotesNotificationsController>(NotesNotificationsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(notesNotificationsController.getHello()).toBe('Hello World!');
    });
  });
});
