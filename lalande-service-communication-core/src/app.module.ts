import { Module } from '@nestjs/common';
import { ProducerModule } from 'src/module-01-producer/producer.module';
import { ConsumerModule } from 'src/module-02-consumer/consumer.module';
import { DeliveryModule } from 'src/module-03-delivery/delivery.module';

@Module({
  imports: [ProducerModule, ConsumerModule, DeliveryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
