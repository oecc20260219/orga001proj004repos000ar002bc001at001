/*message.input-adapter.ts*/

import { Injectable } from '@nestjs/common';
import { MessageDto } from '../../../layer02/application/dto/message.dto';
import { MessageInputPort } from '../../../layer02/application/port/input/message.input-port';

@Injectable()
export class MessageInputAdapter {
  constructor(private readonly messageInputPort: MessageInputPort) {}

  async sendMessage(dto: MessageDto): Promise<any> {
    return this.messageInputPort.execute(dto);
  }
}
