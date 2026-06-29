import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  constructor(email?: string, passwordHash?: string, name?: string) {
    if (email) this.email = email;
    if (passwordHash) this.passwordHash = passwordHash;
    if (name) this.name = name;
  }
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    unique: true,
  })
  email!: string;

  @Column({
    name: 'password_hash',
  })
  passwordHash!: string;

  @Column()
  name!: string;

  @Column({
    name: 'avatar_url',
    nullable: true,
  })
  avatarUrl?: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt!: Date;
}
