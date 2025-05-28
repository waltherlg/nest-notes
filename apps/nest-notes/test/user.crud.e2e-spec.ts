import { HttpStatus, INestApplication } from '@nestjs/common';
import { PrismaService } from '../src/db/prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { appSetup } from '../src/setup/app.setup';
import { cleanDb } from './db.helper';
import { USER_PATHS } from '../src/features/users/config/user.constants';
import { mockUserData } from './mocks/userMockFiles';
import * as request from 'supertest';

describe('SA User CRUD (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let userId1;

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
      .post(`/${USER_PATHS.SA_USERS}`)
      .send(mockUserData.userInputCreateData(1))
      .expect(HttpStatus.CREATED);

    const body = response.body;

    userId1 = body.id;

    expect(body).toEqual(mockUserData.userViewData(1));
  });

  it('SA get user1 = 200 with userObj', async () => {
    const response = await request(app.getHttpServer())
      .get(`/${USER_PATHS.SA_USERS}/${userId1}`)
      .expect(HttpStatus.OK);

    const body = response.body;

    expect(body).toEqual(mockUserData.userViewData(1));
  });

  it('SA delete user1 = 204 with userObj', async () => {
    await request(app.getHttpServer())
      .delete(`/${USER_PATHS.SA_USERS}/${userId1}`)
      .expect(HttpStatus.NO_CONTENT);
  });

  it('SA get user1 after delete = 404', async () => {
    await request(app.getHttpServer())
      .get(`/${USER_PATHS.SA_USERS}/${userId1}`)
      .expect(HttpStatus.NOT_FOUND);
  });
});
