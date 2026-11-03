import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TemperatureSensor } from './entities/temperature-sensor.entity';
import { CreateTemperatureSensorDto } from './dto/create-temperature-sensor.dto';
@Injectable()
export class TemperatureSensorsService {
 constructor(
 @InjectRepository(TemperatureSensor)
 private readonly temperatureSensorRepository:
Repository<TemperatureSensor>,
 ) {}
 async create(createDto: CreateTemperatureSensorDto) {
 const record =
this.temperatureSensorRepository.create(createDto);
 return await this.temperatureSensorRepository.save(record);
 }
 async findAll() {
 return await this.temperatureSensorRepository.find({
 order: { createdAt: 'DESC' },
 take: 50,
 });
 }
} 
