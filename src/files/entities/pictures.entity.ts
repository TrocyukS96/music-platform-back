import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pictures {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdAt: Date;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  size: number;

  @Column()
  data: string;
}
