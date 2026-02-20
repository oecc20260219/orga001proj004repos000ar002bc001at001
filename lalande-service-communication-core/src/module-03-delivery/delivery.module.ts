/*delivery.module.ts*/

import { Module } from '@nestjs/common';
import { SqsModule } from '@ssut/nestjs-sqs';
import { SQSClient } from '@aws-sdk/client-sqs';
import { MessageInputAdapter } from 'src/module-03-delivery/block02/engine/layer03/adapter/input/message.input-adapter';
import { MessageInteractor } from 'src/module-03-delivery/block02/engine/layer02/application/interactor/message.interactor';
import { MessageInputPort } from 'src/module-03-delivery/block02/engine/layer02/application/port/input/message.input-port';
import { MessagePersistenceOutputPort } from 'src/module-03-delivery/block02/engine/layer02/application/port/output/message-persistence.output-port';
import { MessagePersistenceOutputAdapter } from 'src/module-03-delivery/block02/engine/layer04/infrastructure/db/adapter/output/message-persistence.output-adapter';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [
    SqsModule.register({
      consumers: [
        {
          name: 'queue-lalande-communication-delivered',
          queueUrl:
            'http://localhost:4566/000000000000/queue-lalande-communication-delivered',
          region: 'us-east-1',
          sqs: new SQSClient({
            endpoint: 'http://localhost:4566',
            region: 'us-east-1',
            credentials: {
              accessKeyId: 'test',
              secretAccessKey: 'test',
            },
          }),
        },
      ],
    }),
  ],
  controllers: [],
  providers: [
    PrismaService,
    MessageInputAdapter,
    {
      provide: MessageInputPort,
      useClass: MessageInteractor,
    },
    {
      provide: MessagePersistenceOutputPort,
      useClass: MessagePersistenceOutputAdapter,
    },
  ],
})
export class DeliveryModule {}
