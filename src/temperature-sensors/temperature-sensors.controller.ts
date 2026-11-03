import { Controller, Get, Post, Body } from '@nestjs/common';
import { TemperatureSensorsService } from './temperature-sensors.service';
import { CreateTemperatureSensorDto } from './dto/create-temperature-sensor.dto';

@Controller('temperature-sensors')
export class TemperatureSensorsController {
  constructor(
    private readonly temperatureSensorsService: TemperatureSensorsService,
  ) {}

  @Post()
  async create(@Body() createTemperatureSensorDto: CreateTemperatureSensorDto) {
    return await this.temperatureSensorsService.create(createTemperatureSensorDto);
  }

  @Get()
  async findAll() {
    return await this.temperatureSensorsService.findAll();
  }
}