import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export async function cleanDb(): Promise<void> {
  await prisma.prismaUser.deleteMany();
  await prisma.$disconnect();
}
