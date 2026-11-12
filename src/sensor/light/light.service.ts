import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LightSensor } from './entities/light.entity';
import { CreateLightDto } from './dto/create-light.dto';
import { UpdateLightDto } from './dto/update-light.dto';
import { LightAlertsService } from './light-alerts.service';

@Injectable()
export class LightService {
  private readonly CRITICAL_LIGHT = 1000; 
  constructor(
    @InjectRepository(LightSensor)
    private readonly lightRepository: Repository<LightSensor>,
    private readonly alertsService: LightAlertsService, 
  ) {}

  async create(createLightDto: CreateLightDto): Promise<LightSensor> {
    const lightRecord = this.lightRepository.create(createLightDto);
    const saved = await this.lightRepository.save(lightRecord); 

    if (saved.value <= this.CRITICAL_LIGHT) {
      this.alertsService.emitAlert({
        message: `Critical Light level! Value ${saved.value}
        ${saved.unit}`,
        temperature: saved.value,
        sensorName: saved.sensorName,
        timestamp: saved.timestamp,
        severity: 'critical',
      });
    } 

    return saved
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