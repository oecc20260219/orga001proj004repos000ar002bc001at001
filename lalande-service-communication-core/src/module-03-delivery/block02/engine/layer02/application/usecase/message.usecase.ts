/*message.usecase.ts*/

import { MessageDto } from 'src/module-03-delivery/block02/engine/layer02/application/dto/message.dto';

export interface MessageUseCase {
  execute(dto: MessageDto): Promise<any>;
}
