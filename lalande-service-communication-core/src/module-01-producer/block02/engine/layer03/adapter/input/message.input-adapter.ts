/*message.input-adapter.ts*/

import { Injectable } from '@nestjs/common';
import { MessageDto } from 'src/module-01-producer/block02/engine/layer02/application/dto/message.dto';
import { MessageInputPort } from 'src/module-01-producer/block02/engine/layer02/application/port/input/message.input-port';

@Injectable()
export class MessageInputAdapter {
  constructor(private readonly messageInputPort: MessageInputPort) {}

  async sendMessage(dto: MessageDto): Promise<any> {
    return this.messageInputPort.execute(dto);
  }
}
