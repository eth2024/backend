import {
  Entity,
  Column,
  PrimaryColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Image {
  @PrimaryColumn({ generated: 'increment' })
  id: number;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column()
  url: string;

  @Column({ default: false })
  matched: boolean;

  @Column({ default: false })
  confirmed: boolean;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
