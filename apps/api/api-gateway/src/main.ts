import { NestFactory } from '@nestjs/core';
import { HttpExceptionFilter } from 'utils/http-exception.filter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.API_GATEWAY_PORT);
}
bootstrap();
