import {
  Entity,
  Column,
  Index,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index('idx_user')
  user: number;

  @Column()
  image: number;

  @Column({ default: false })
  isRewarded: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
