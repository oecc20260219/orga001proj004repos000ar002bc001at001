/* message-persistence.output-adapter.ts */

import { Injectable } from '@nestjs/common';
import { MessagePersistenceOutputPort } from 'src/module-03-delivery/block02/engine/layer02/application/port/output/message-persistence.output-port';
import { Message } from 'src/module-03-delivery/block02/engine/layer01/enterprise/domain/message';
import { PrismaService } from 'prisma/prisma.service';

type PrismaJson = { [key: string]: any };

@Injectable()
export class MessagePersistenceOutputAdapter extends MessagePersistenceOutputPort {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async update(message: Message): Promise<Message> {
    console.log('Actualizando en DB:', message.event_code);

    try {
      await this.prisma.tb_communication.update({
        where: {
          event_id: message.event_id,
        },
        data: {
          message_status: message.message_status,
          message_delivered_at: message.message_delivered_at,
        },
      });
      return message;
    } catch (error: unknown) {
      console.error('Error al actualizar en DB:', error);
      throw new Error(
        'No se pudo actualizar el estado del mensaje en la base de datos',
      );
    }
  }
}
