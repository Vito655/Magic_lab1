import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- ДОДАЄМО CORS ---[cite: 18]
  app.enableCors({
    origin: process.env.FRONTEND_URL || '*', // дозволяє запити з будь-якого фронтенду[cite: 18]
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',[cite: 18]
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();