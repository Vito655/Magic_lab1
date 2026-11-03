import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LightSensor } from './entities/light.entity';
import { CreateLightDto } from './dto/create-light.dto';
import { UpdateLightDto } from './dto/update-light.dto';

@Injectable()
export class LightService {
  constructor(
    @InjectRepository(LightSensor)
    private readonly lightRepository: Repository<LightSensor>,
  ) {}

  async create(createLightDto: CreateLightDto): Promise<LightSensor> {
    const lightRecord = this.lightRepository.create(createLightDto);
    return await this.lightRepository.save(lightRecord);
  }

  async findAll(): Promise<LightSensor[]> {
    return await this.lightRepository.find();
  }

  async findOne(id: string): Promise<LightSensor> {
    const record = await this.lightRepository.findOne({ where: { id } });
    if (!record) {
      throw new NotFoundException(`Light sensor record with id ${id} not found`);
    }
    return record;
  }

  async update(id: string, updateLightDto: UpdateLightDto): Promise<LightSensor> {
    await this.findOne(id);
    await this.lightRepository.update(id, updateLightDto);
    return await this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const record = await this.findOne(id);
    await this.lightRepository.remove(record);
  }
}