import {
  Entity,
  Column,
  PrimaryColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Image {
  @PrimaryColumn()
  id: number;

  @Column()
  name: number;

  @Column()
  category: string;

  @Column()
  url: string;

  @Column()
  matched: boolean;

  @Column()
  confirmed: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
