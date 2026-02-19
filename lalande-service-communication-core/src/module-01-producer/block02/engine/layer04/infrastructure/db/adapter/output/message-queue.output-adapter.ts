/*message-queue.output-adapter.ts*/

import { Injectable, Logger } from '@nestjs/common';
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import { MessageQueueOutputPort } from '../../../../../../../../module-01-producer/block02/engine/layer02/application/port/output/message-queue.output-port';
import { Message } from '../../../../../../../../module-01-producer/block02/engine/layer01/enterprise/domain/message';

@Injectable()
export class MessageQueueOutputAdapter extends MessageQueueOutputPort {
  private readonly sqsClient: SQSClient;
  private readonly logger = new Logger(MessageQueueOutputAdapter.name);
  private readonly queueUrl =
    'http://localhost:4566/000000000000/queue-lalande-communication';

  constructor() {
    super();
    this.sqsClient = new SQSClient({
      region: 'us-east-1',
      endpoint: 'http://localhost:4566',
      credentials: {
        accessKeyId: 'test',
        secretAccessKey: 'test',
      },
    });
  }

  async enqueue(message: Message): Promise<void> {
    try {
      const input = {
        QueueUrl: this.queueUrl,
        MessageBody: JSON.stringify({
          event_id: message.event_id,
          event_code: message.event_code,
          message_type: message.message_type,
          message_payload: message.message_payload,
          message_status: 'PENDING',
          audit_insert_user: message.audit_insert_user,
          audit_insert_date: message.audit_insert_date,
        }),
      };

      const command = new SendMessageCommand(input);
      await this.sqsClient.send(command);
      this.logger.log(`Mensaje encolado: ${message.event_code}`);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      this.logger.error(`Error en SQS: ${errorMessage}`);
      throw new Error('Error al encolar mensaje');
    }
  }
}
