import { randomUUID } from 'node:crypto';

export class CreateUserDomainDto {
  constructor(
    public userName: string,
    public email: string,
    public id: string = randomUUID(),
  ) {}
}
