/*message-queue.output-port.ts*/

import { Message } from '../../../../../../../module-01-producer/block02/engine/layer01/enterprise/domain/message';

export abstract class MessageQueueOutputPort {
  abstract enqueue(message: Message): Promise<void>;
}
