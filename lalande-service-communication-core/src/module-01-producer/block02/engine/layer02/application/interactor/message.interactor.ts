/*message.interactor.ts*/

import { Injectable } from '@nestjs/common';
import { MessageInputPort } from '../../../../../../module-01-producer/block02/engine/layer02/application/port/input/message.input-port';
import { MessageQueueOutputPort } from '../../../../../../module-01-producer/block02/engine/layer02/application/port/output/message-queue.output-port';
import { MessageDto } from '../../../../../../module-01-producer/block02/engine/layer02/application/dto/message.dto';
import { Message } from '../../../../../../module-01-producer/block02/engine/layer01/enterprise/domain/message';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MessageInteractor implements MessageInputPort {
  constructor(
    private readonly messageQueueOutputPort: MessageQueueOutputPort,
  ) {}

  async execute(dto: MessageDto): Promise<{
    success: boolean;
    event_id: string | undefined;
    event_code: string | undefined;
  }> {
    console.log('--- DEBUG DTO ---', dto);

    const event_id = uuidv4();

    const message = new Message(
      event_id,
      dto.event_code,
      dto.message_type,
      {
        to: dto.message_payload?.to,
        body: dto.message_payload?.body,
      },
      'PENDING',
      undefined,
      0,
      undefined,
      'ACTIVE',
      dto.audit_insert_user,
      new Date(),
    );

    console.log('--- DEBUG MESSAGE ENTITY ---', message);

    await this.messageQueueOutputPort.enqueue(message);

    return {
      success: true,
      event_id: message.event_id,
      event_code: message.event_code,
    };
  }
}
