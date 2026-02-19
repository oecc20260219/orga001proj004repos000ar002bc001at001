import { Injectable } from '@nestjs/common';
import { Message } from '../../../../../../module-02-consumer/block02/engine/layer01/enterprise/domain/message';
import { MessagePersistenceOutputPort } from '../port/output/message-persistence.output-port';
import { MessageInputPort } from '../port/input/message.input-port';
import { MessageDto } from '../dto/message.dto';

@Injectable()
export class MessageInteractor implements MessageInputPort {
  constructor(private readonly messagePersistenceOutputPort: MessagePersistenceOutputPort) {}

  async execute(dto: MessageDto): Promise<void> {
    console.log('--- CONSUMER: INICIADO DESDE SQS ---', dto);

    const message = new Message(
      dto.event_id,
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

    console.log('--- CONSUMER: FINALIZADO DESDE SQS ---', message);

    await this.messagePersistenceOutputPort.persist(message);

  }
}
