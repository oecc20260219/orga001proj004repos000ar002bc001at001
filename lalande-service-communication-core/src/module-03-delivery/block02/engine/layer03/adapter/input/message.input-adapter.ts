/*message.input-adapter.ts*/

import { Controller } from '@nestjs/common';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';
import { MessageInputPort } from 'src/module-03-delivery/block02/engine/layer02/application/port/input/message.input-port';
import { MessageDto } from 'src/module-03-delivery/block02/engine/layer02/application/dto/message.dto';

@Controller()
export class MessageInputAdapter {
  constructor(private readonly handleMessageInputAdapter: MessageInputPort) {}

  @SqsMessageHandler('queue-lalande-communication-delivered', false)
  async handleMessageDelivered(message: { Body: string }) {
    console.log('>>> MENSAJE DELIVERED EN MODO ESCUCHA:', message.Body);
    const data = JSON.parse(message.Body) as MessageDto;
    await this.handleMessageInputAdapter.execute(data);
  }
}
