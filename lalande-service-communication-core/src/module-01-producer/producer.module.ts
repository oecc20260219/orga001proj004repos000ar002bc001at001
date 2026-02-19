/* producer.module.ts */

import { Module } from '@nestjs/common';
import { HttpMessageController } from './block02/engine/layer03/adapter/controller/message.controller';
import { MessageInputAdapter } from './block02/engine/layer03/adapter/input/message.input-adapter';
import { MessageInputPort } from './block02/engine/layer02/application/port/input/message.input-port';
import { MessageInteractor } from './block02/engine/layer02/application/interactor/message.interactor';
import { MessageQueueOutputPort } from './block02/engine/layer02/application/port/output/message-queue.output-port';
import { MessageQueueOutputAdapter } from './block02/engine/layer04/infrastructure/db/adapter/output/message-queue.output-adapter';

@Module({
  controllers: [HttpMessageController],
  providers: [
    // 1. El Adaptador de Entrada (usado por el Controller)
    MessageInputAdapter,

    // 2. Vinculación del Puerto con el Interactor (Lógica de Negocio)
    {
      provide: MessageInputPort,
      useClass: MessageInteractor,
    },

    // 3. Vinculación del Puerto de Salida con el Adaptador de SQS
    {
      provide: MessageQueueOutputPort,
      useClass: MessageQueueOutputAdapter,
    },
  ],
})
export class ProducerModule {}
