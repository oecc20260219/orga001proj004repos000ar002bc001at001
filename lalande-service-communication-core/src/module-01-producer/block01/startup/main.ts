// main.ts
import { NestFactory } from '@nestjs/core';
import { ProducerModule } from '../../../module-01-producer/producer.module';

async function bootstrap() {
  const app = await NestFactory.create(ProducerModule);
  await app.listen(3000);
}
bootstrap();
