/*http-message.controller.ts*/

import { Controller, Post, Body } from '@nestjs/common';
import { MessageDto } from 'src/module-01-producer/block02/engine/layer02/application/dto/message.dto';
import { MessageInputAdapter } from 'src/module-01-producer/block02/engine/layer03/adapter/input/message.input-adapter';
import { HttpRequest } from 'src/module-01-producer/block02/engine/layer03/adapter/http/http-request';
import { HttpResponse } from 'src/module-01-producer/block02/engine/layer03/adapter/http/http-response';

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
