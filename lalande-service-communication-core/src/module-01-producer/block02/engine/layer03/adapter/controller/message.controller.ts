/*http-message.controller.ts*/

import { Controller, Post, Body } from '@nestjs/common';
import { MessageDto } from '../../../layer02/application/dto/message.dto';
import { MessageInputAdapter } from '../input/message.input-adapter';
import { HttpRequest } from '../http/http-request';
import { HttpResponse } from '../http/http-response';

@Controller('send-message')
export class HttpMessageController {
  constructor(private readonly messageInputAdapter: MessageInputAdapter) {}

  @Post()
  async send(
    @Body() request: HttpRequest<MessageDto>,
  ): Promise<HttpResponse<unknown>> {
    const result: unknown = await this.messageInputAdapter.sendMessage(
      request.data,
    );
    return HttpResponse.ok(result, 'Mensaje procesado correctamente');
  }
}
