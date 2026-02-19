/*message.usecase.ts*/

import { MessageDto } from '../../../../../../module-01-producer/block02/engine/layer02/application/dto/message.dto';

export interface MessageUseCase {
  execute(dto: MessageDto): Promise<any>;
}
