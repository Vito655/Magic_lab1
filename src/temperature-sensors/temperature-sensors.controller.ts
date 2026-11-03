import { Controller, Get, Post, Body } from '@nestjs/common';
import { TemperatureSensorsService } from './temperature-sensors.service';
import { CreateTemperatureSensorDto } from './dto/create-temperature-sensor.dto';
@Controller('temperature-sensors')
export class TemperatureSensorsController {
 constructor(
 private readonly temperatureSensorsService:
TemperatureSensorsService,
 ) {}
 @Post()
 create(@Body() createTemperatureSensorDto:
CreateTemperatureSensorDto) {
 return
this.temperatureSensorsService.create(createTemperatureSensorDto);
 }
 @Get()
 findAll() {
 return this.temperatureSensorsService.findAll();
 }
} 