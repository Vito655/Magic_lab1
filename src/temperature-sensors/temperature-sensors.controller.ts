import { Controller, Get, Post, Body, Sse, MessageEvent } from '@nestjs/common';
import { TemperatureSensorsService } from './temperature-sensors.service';
import { CreateTemperatureSensorDto } from './dto/create-temperature-sensor.dto';
import { TemperatureAlertsService } from './temperature-alerts.service';
import { Observable, map } from 'rxjs'; 

@Controller('temperature-sensors')
export class TemperatureSensorsController {
  constructor(
    private readonly temperatureSensorsService: TemperatureSensorsService,
    private readonly alertsService: TemperatureAlertsService, 
  ) {}

  @Post()
  async create(@Body() createTemperatureSensorDto: CreateTemperatureSensorDto) {
    return await this.temperatureSensorsService.create(createTemperatureSensorDto);
  }

  @Get()
  async findAll() {
    return await this.temperatureSensorsService.findAll();
  }

  @Sse('alerts')
  alerts(): Observable<MessageEvent> {
    return this.alertsService.getAlertStream().pipe(
      map((alert) => ({
        data: alert,
      })),
    ); 
  }
}