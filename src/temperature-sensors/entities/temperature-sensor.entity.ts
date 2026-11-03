import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('temperature-sensors')
export class TemperatureSensor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 200,
  })
  sensorName: string;

  @Column({
    type: 'double precision',
  })
  value: number;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  unit: string;

  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  timestamp: Date;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  createdAt: Date;
}