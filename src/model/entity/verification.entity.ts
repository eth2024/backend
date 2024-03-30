import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Verification {
  @PrimaryColumn()
  id: number;

  @Column()
  user: number;

  @Column()
  image: number;

  @Column()
  isRewarded: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
