import { Module } from '@nestjs/common';
import { ProducerModule } from './module-01-producer/producer.module';
import { ConsumerModule } from './module-02-consumer/consumer.module';

@Module({
  imports: [
    ProducerModule,
    ConsumerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
