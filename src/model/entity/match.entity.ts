import {
  Entity,
  Column,
  Index,
  PrimaryColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Match {
  @PrimaryColumn()
  id: number;

  @Column()
  @Index('idx_user')
  user: number;

  @Column()
  image: number;

  @Column()
  isRewarded: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
