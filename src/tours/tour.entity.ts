import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tour {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;
}
