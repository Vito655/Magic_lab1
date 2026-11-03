import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TemperatureSensorsModule } from './temperature-sensors/temperature-sensors.module';
import { TemperatureSensor } from './temperature-sensors/entities/temperature-sensor.entity';
import { LightModule } from './sensor/light/light.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
 imports: [
 TypeOrmModule.forRootAsync({
 imports: [ConfigModule],
 useFactory: (configService: ConfigService) => ({
 type: 'postgres',
 host: configService.get<string>('DB_HOST'),
 port: configService.get<number>('DB_PORT'),
 username: configService.get<string>('DB_USERNAME'),
 password: configService.get<string>('DB_PASSWORD'),
 database: configService.get<string>('DB_NAME'),
 entities: [TemperatureSensor, LightModule],
 synchronize: true,
 ssl: {
 rejectUnauthorized: false,
 },
 }),
 inject: [ConfigService],
 }),
 TemperatureSensorsModule,
 LightModule,
 ],
 controllers: [AppController],
 providers: [AppService],
})
export class AppModule {} 
