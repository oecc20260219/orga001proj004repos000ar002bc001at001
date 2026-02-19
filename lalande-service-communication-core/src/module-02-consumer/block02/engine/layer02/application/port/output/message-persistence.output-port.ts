/*message-persistence.output-port.ts*/

import { Message } from '../../../../../../../module-02-consumer/block02/engine/layer01/enterprise/domain/message';

export abstract class MessagePersistenceOutputPort {
  abstract persist(message: Message): Promise<Message>;
}
