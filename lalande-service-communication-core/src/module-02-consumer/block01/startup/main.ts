// main.ts
import { NestFactory } from '@nestjs/core';
import { ConsumerModule } from '../../../module-02-consumer/consumer.module';

async function bootstrap() {
  const app = await NestFactory.create(ConsumerModule);
  await app.listen(3000);
}
bootstrap();
