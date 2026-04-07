import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

// Load environment variables from a .env file
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita o Cross-Origin Resource Sharing (CORS)
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
