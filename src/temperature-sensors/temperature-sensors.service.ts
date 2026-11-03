import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TemperatureSensor } from './entities/temperature-sensor.entity';
import { CreateTemperatureSensorDto } from './dto/create-temperature-sensor.dto';
import { UpdateTemperatureSensorDto } from './dto/update-temperature-sensor.dto';

@Injectable()
export class TemperatureSensorsService {
  constructor(
    @InjectRepository(TemperatureSensor)
    private readonly temperatureSensorRepository: Repository<TemperatureSensor>,
  ) {}

  async create(createSensorDto: CreateTemperatureSensorDto): Promise<TemperatureSensor> {
    // TypeORM створить сутність з урахуванням переданого timestamp (якщо він є) 
    // та автоматично згенерує id та createdAt
    const sensor = this.temperatureSensorRepository.create(createSensorDto);
    return await this.temperatureSensorRepository.save(sensor);
  }

  async findAll(): Promise<TemperatureSensor[]> {
    return await this.temperatureSensorRepository.find();
  }

  async findOne(id: string): Promise<TemperatureSensor> {
    const sensor = await this.temperatureSensorRepository.findOne({ where: { id } });
    if (!sensor) {
      throw new NotFoundException(`Sensor with id ${id} not found`);
    }
    return sensor;
  }

  async update(id: string, updateSensorDto: UpdateTemperatureSensorDto): Promise<TemperatureSensor> {
    await this.findOne(id); // Перевіряємо, чи існує запис перед оновленням
    await this.temperatureSensorRepository.update(id, updateSensorDto);
    return await this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const sensor = await this.findOne(id);
    await this.temperatureSensorRepository.remove(sensor);
  }
}