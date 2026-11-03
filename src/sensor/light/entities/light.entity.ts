import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('light_sensors')
export class LightSensor {
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