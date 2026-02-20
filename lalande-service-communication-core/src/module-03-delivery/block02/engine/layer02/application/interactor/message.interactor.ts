import { Injectable } from '@nestjs/common';
import { Message } from 'src/module-03-delivery/block02/engine/layer01/enterprise/domain/message';
import { MessagePersistenceOutputPort } from 'src/module-03-delivery/block02/engine/layer02/application/port/output/message-persistence.output-port';
import { MessageInputPort } from 'src/module-03-delivery/block02/engine/layer02/application/port/input/message.input-port';
import { MessageDto } from 'src/module-03-delivery/block02/engine/layer02/application/dto/message.dto';

@Injectable()
export class MessageInteractor implements MessageInputPort {
  constructor(
    private readonly messagePersistenceOutputPort: MessagePersistenceOutputPort,
  ) {}

  async execute(dto: MessageDto): Promise<void> {
    console.log('--- DELIVERY: INICIADO DESDE SQS ---', dto);

    const message = new Message(
      dto.event_id,
      dto.event_code,
      dto.message_type,
      {
        to: dto.message_payload?.to,
        body: dto.message_payload?.body,
      },
      'DELIVERED',
      new Date(),
      0,
      undefined,
      'ACTIVE',
      dto.audit_insert_user,
      undefined,
    );

    console.log('--- DELIVERY: FINALIZADO DESDE SQS ---', message);

    await this.messagePersistenceOutputPort.update(message);
  }
}
