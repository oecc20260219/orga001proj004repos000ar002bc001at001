/*message.usecase.ts*/

import { MessageDto } from '../../../../../../module-02-consumer/block02/engine/layer02/application/dto/message.dto';

export interface MessageUseCase {
  execute(dto: MessageDto): Promise<any>;
}
