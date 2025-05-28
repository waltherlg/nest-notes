import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'User' })
export class TypeOrmUser {
  @PrimaryColumn('uuid')
  id: string;
  @Column()
  userName: string;
  @Column()
  email: string;
}
