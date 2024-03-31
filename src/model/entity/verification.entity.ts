import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Verification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user: number;

  @Column()
  image: number;

  @Column({ default: false })
  isRewarded: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
