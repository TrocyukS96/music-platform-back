import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tracks {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdAt: Date;

  @Column()
  name: string;

  @Column()
  musician: string;

  @Column()
  description: string;

  @Column()
  picture: string;

  @Column()
  audio: string;

  @Column()
  listens: number;
}
