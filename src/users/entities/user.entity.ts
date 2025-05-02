import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { AbstractEntity } from '../../shared/utils/abstract.entity';
import { Role } from '../roles/entities/role.entity';

@Entity()
export class User extends AbstractEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  google_image: string;

  @Column({ nullable: true })
  profile: string;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable()
  roles: Role[];
}
