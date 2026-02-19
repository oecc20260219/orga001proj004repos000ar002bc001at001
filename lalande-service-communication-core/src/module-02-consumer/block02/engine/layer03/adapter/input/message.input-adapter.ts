/*message.input-adapter.ts*/

import { Controller } from '@nestjs/common';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';
import { MessageInputPort } from '../../../layer02/application/port/input/message.input-port';
import { MessageDto } from '../../../layer02/application/dto/message.dto';

@Controller()
export class MessageInputAdapter {
  constructor(private readonly handleMessageInputAdapter: MessageInputPort) {}

  @SqsMessageHandler('queue-lalande-communication', false)
  async handleMessage(message: { Body: string }) {
    console.log('>>> MENSAJE RECIBIDO EN ADAPTADOR:', message.Body);
    const data = JSON.parse(message.Body) as MessageDto;
    await this.handleMessageInputAdapter.execute(data);
  }
}
