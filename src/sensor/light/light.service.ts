import { Injectable, NotFoundException } from '@nestjs/common';
import { LightSensor } from './entities/light.entity';
import { CreateLightDto } from './dto/create-light.dto';
import { UpdateLightDto } from './dto/update-light.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LightService {
  private sensors: LightSensor[] = [];

  create(createLightDto: CreateLightDto): LightSensor {
    const sensor: LightSensor = {
      id: uuidv4(),
      timestamp: new Date(),
      ...createLightDto,
    };
    this.sensors.push(sensor);
    return sensor;
  }

  findAll(): LightSensor[] {
    return this.sensors;
  }

  findOne(id: string): LightSensor {
    const sensor = this.sensors.find((s) => s.id === id);
    if (!sensor) {
      throw new NotFoundException(`Sensor with id ${id} not found`);
    }
    return sensor;
  }

  update(id: string, updateLightDto: UpdateLightDto): LightSensor {
    const sensor = this.findOne(id);
    Object.assign(sensor, updateLightDto);
    return sensor;
  }

  remove(id: string): void {
    const sensor = this.findOne(id);
    this.sensors = this.sensors.filter((s) => s.id !== sensor.id);
  }
}