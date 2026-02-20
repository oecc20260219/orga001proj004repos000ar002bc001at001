/*message-persistence.output-port.ts*/

import { Message } from 'src/module-03-delivery/block02/engine/layer01/enterprise/domain/message';

export abstract class MessagePersistenceOutputPort {
  abstract update(message: Message): Promise<Message>;
}
