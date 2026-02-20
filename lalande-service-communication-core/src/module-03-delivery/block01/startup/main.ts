// main.ts
import { NestFactory } from '@nestjs/core';
import { DeliveryModule } from 'src/module-03-delivery/delivery.module';

async function bootstrap() {
  const app = await NestFactory.create(DeliveryModule);
  await app.listen(3000);
}
bootstrap();
