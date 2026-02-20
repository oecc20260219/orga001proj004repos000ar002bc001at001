/*message.dto.ts*/

import { IsString, IsEnum, IsObject, IsNotEmpty } from 'class-validator';

export enum MessageType {
  SMS = 'SMS',
  WHATSAPP = 'WHATSAPP',
}

export enum MessageStatus {
  PENDING = 'PENDING',
  DELIVERED = 'DELIVERED',
}

export class MessageDto {
  @IsNotEmpty({ message: 'El id del evento es obligatorio' })
  @IsString({ message: 'El id del evento debe ser una cadena de texto' })
  event_id: string;

  @IsNotEmpty({ message: 'El código del evento es obligatorio' })
  @IsString({ message: 'El código del evento debe ser una cadena de texto' })
  event_code: string;

  @IsNotEmpty({ message: 'El tipo de mensaje es obligatorio' })
  @IsEnum(MessageType, {
    message: 'El tipo debe ser SMS o WHATSAPP',
  })
  message_type: MessageType;

  @IsNotEmpty({ message: 'El payload del mensaje no puede estar vacío' })
  @IsObject({ message: 'El payload debe ser un objeto válido' })
  message_payload: {
    to: string;
    body: string;
    [key: string]: any;
  };

  @IsNotEmpty({ message: 'El estado de mensaje es obligatorio' })
  @IsEnum(MessageStatus, {
    message: 'El estado debe ser PENDING o DELIVERED',
  })
  message_status: MessageStatus;

  @IsNotEmpty({ message: 'El usuario de auditoría es obligatorio' })
  @IsString({ message: 'El usuario de auditoría debe ser un texto' })
  audit_insert_user: string;
}
