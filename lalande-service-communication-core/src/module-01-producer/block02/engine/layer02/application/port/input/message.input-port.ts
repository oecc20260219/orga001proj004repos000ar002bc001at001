/*message.input-port.ts*/

import { MessageDto } from 'src/module-01-producer/block02/engine/layer02/application/dto/message.dto';
import { MessageUseCase } from 'src/module-01-producer/block02/engine/layer02/application/usecase/message.usecase';

export abstract class MessageInputPort implements MessageUseCase {
  abstract execute(dto: MessageDto): Promise<any>;
}
