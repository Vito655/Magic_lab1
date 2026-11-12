import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LightService } from './light.service';
import { LightController } from './light.controller';
import { LightSensor } from './entities/light.entity';
import { LightAlertsService } from './light-alerts.service';

@Module({
  imports: [TypeOrmModule.forFeature([LightSensor])],
  controllers: [LightController],
  providers: [LightService, LightAlertsService],
})
export class LightModule {}