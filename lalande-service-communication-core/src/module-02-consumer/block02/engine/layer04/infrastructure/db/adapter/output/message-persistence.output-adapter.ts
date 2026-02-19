/* message-persistence.output-adapter.ts */

import { Injectable } from '@nestjs/common';
import { MessagePersistenceOutputPort } from '../../../../../layer02/application/port/output/message-persistence.output-port';
import { Message } from '../../../../../layer01/enterprise/domain/message';
import { PrismaService } from 'prisma/prisma.service';

type PrismaJson = { [key: string]: any };

@Injectable()
export class MessagePersistenceOutputAdapter extends MessagePersistenceOutputPort {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async persist(message: Message): Promise<Message> {
    console.log('Guardando en DB:', message.event_code);

    try {
      await this.prisma.tb_communication.create({
        data: {
          event_id: message.event_id,
          event_code: message.event_code,
          message_type: message.message_type,
          message_payload: message.message_payload as unknown as PrismaJson,
          message_status: message.message_status,
          audit_state: message.audit_state!,
          audit_insert_user: message.audit_insert_user!,
        },
      });
      return message;
    } catch (error: unknown) {
      console.error('Error al persistir en DB:', error);
      throw new Error('No se pudo guardar el mensaje en la base de datos');
    }
  }
}
