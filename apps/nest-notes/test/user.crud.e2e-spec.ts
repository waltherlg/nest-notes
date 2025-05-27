import { HttpStatus, INestApplication } from '@nestjs/common';
import { PrismaService } from '../src/db/prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { appSetup } from '../src/setup/app.setup';
import { cleanDb } from './db.helper';
import { USER_PATHS } from '../src/features/users/config/user.constants';
import { mockUserData } from './mocks/userMockFiles';
import * as request from 'supertest';

describe('Post CRUD (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    appSetup(app);
    await app.init();

    prisma = app.get(PrismaService);
    await cleanDb();
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
  });

  it('SA create user1 = 201 with userObj', async () => {
    const response = await request(app.getHttpServer())
      .post(`${USER_PATHS.SA_USERS}`)
      .send(mockUserData.userInputCreateData(1))
      .expect(HttpStatus.CREATED);

    expect(response.body).toEqual(mockUserData.userViewData(1));
  });
});
